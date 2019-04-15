package com.io.Taskiro.web;


import com.io.Taskiro.model.TaskRepository;
import com.io.Taskiro.model.User;
import com.io.Taskiro.model.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TaskRepository taskRepository;


    private final Logger log = LoggerFactory.getLogger(UserController.class);

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/users")
    Collection<User> users() {
        return userRepository.findAll();
    }

    @GetMapping("/user/{id}")
    ResponseEntity<?> getUser(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);
        return user.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    @PostMapping("/user/login")
    ResponseEntity<?> getUser(@RequestParam String login, @RequestParam String password) {
        User user = userRepository.findByLogin(login);
        if(user!=null && user.getPassword().equals(password)){
            return ResponseEntity.ok().body(user);
        }
        else{
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }


//    @PostMapping("/user")
//    ResponseEntity<User> createUser(@Valid @RequestBody User user) throws URISyntaxException {
//        log.info("Request to create user: {}", user);
//        User result = userRepository.save(user);
//        return ResponseEntity.created(new URI("/api/user/" + result.getId()))
//                .body(result);
//    }
    @PostMapping("/user")
    ResponseEntity<User> createUser(@RequestParam String name,
                                    @RequestParam String surname,
                                    @RequestParam String email,
                                    @RequestParam String login,
                                    @RequestParam String password,
                                    @RequestParam String phone) throws URISyntaxException {
        log.info("Request to create user: {}");
        User n = new User(name,surname,email,login,password,phone);

        User result = userRepository.save(n);
        return ResponseEntity.created(new URI("/api/user/" + result.getId()))
                .body(result);
    }

    @PutMapping("/user")
    ResponseEntity<User> updateUser(@Valid @RequestBody User user) {
        log.info("Request to update user: {}", user);
        User result = userRepository.save(user);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        log.info("Request to delete user: {}", id);
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}