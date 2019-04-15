package com.io.Taskiro;



import com.google.maps.model.LatLng;
import com.io.Taskiro.model.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;
import java.util.Random;
import java.util.stream.Stream;




@Component
class Initializer implements CommandLineRunner {
    final static int NUMBER_OF_USERS = 30;
    final static String[] NAMES = {"Julia","Zuzanna", "Maja","Alicja", "Maria", "Jakub", "Jan", "Szymon", "Bartosz", "Dawid"};
    final static String[] SURNAMES = {"Nowak", "Wojcik", "Kowalczyk", "Wozniak", "Mazur", "Krawczyk", "Wieczorek", "Adamczyk", "Dudek", "Pawlak"};
    final static String[] TITLES = {"Koszenie trawy", "Zmywanie naczyń", "Wynieś śmieci", "Przewóz żywyghf zwierząt, ALPAKI", "Trzeba iść do sklepu", "2 worki śmieci", "Kup mi mleko", "32 psy szukają kochającej pani", "Potrzebuję projekt na IO", "Szkoda gadać"};
    final static double MIN_LAT =50.046934;
    final static double MAX_LAT =50.069025;
    final static double MIN_LNG =19.918743;
    final static double MAX_LNG =19.965103;

    final static int NUMBER_OF_TASKS = 50;

    private final UserRepository userRepository;
    private final TaskRepository taskRepository;

    public Initializer(UserRepository userRepository, TaskRepository taskRepository) {
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
    }

    @Override
    public void run(String... strings) {
        if(true){

            //userRepository.deleteAll();
            //taskRepository.deleteAll();

            Random rand = new Random();

            for (int i = 0; i < NUMBER_OF_USERS; i++) {
                String name = NAMES[rand.nextInt(NAMES.length-1)];
                String surname = SURNAMES[rand.nextInt(SURNAMES.length-1)];
                String email = name + "." + surname + "@gmail.com";
                String login = name + surname;
                String password = "123456";
                String phone = "123123123";

                userRepository.save(new User(name, surname, email, login, password,phone));
            }

            for (int i = 0; i < NUMBER_OF_TASKS; i++) {
                String title = TITLES[rand.nextInt(TITLES.length - 1)];
                String description = "Zadanko do wykonania u mnie w domku i wgl";
                TaskType type = TaskType.randomTaskType();
                double lat = MIN_LAT + (MAX_LAT - MIN_LAT) * rand.nextDouble();
                double lng = MIN_LNG + (MAX_LNG - MIN_LNG) * rand.nextDouble();
                LatLng coords = new LatLng(lat, lng);
                Double price = Double.valueOf(rand.nextInt(95) + 5);
                LocalDateTime deadline = LocalDateTime.of(2018, 11, 29, 20, 20, 20);
                LocalDateTime addTime = LocalDateTime.of(2018, 11, 29, 20, 20, 20);
                taskRepository.save(new Task(title, description, type, coords, price, deadline, addTime));
            }
        }




////        User djug = repository.findByName("Denver JUG");
////        Event e = Event.builder().title("Full Stack Reactive")
////                .description("Reactive with Spring Boot + React")
////                .date(Instant.parse("2018-12-12T18:00:00.000Z"))
////                .build();
////        djug.setEvents(Collections.singleton(e));
////        repository.save(djug);
//
////        User.findAll().forEach(System.out::println);
    }
}