package com.io.Taskiro.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pl.smsapi.BasicAuthClient;
import pl.smsapi.api.SmsFactory;
import pl.smsapi.api.action.sms.SMSSend;
import pl.smsapi.api.response.MessageResponse;
import pl.smsapi.api.response.StatusResponse;
import pl.smsapi.exception.ClientException;
import pl.smsapi.exception.SmsapiException;

@RestController
@RequestMapping("/api")
public class SMSController {

    @PostMapping("/sms")
    ResponseEntity<?> sendSMS(@RequestParam String message, @RequestParam String number) {
        try {
            String passwordHash = "Password MD5";
            BasicAuthClient client = new BasicAuthClient("login_email", passwordHash);

            SmsFactory smsApi = new SmsFactory(client);
            String phoneNumber = number;
            SMSSend action = smsApi.actionSend()
                    .setText(message)
                    .setTo(phoneNumber);

            StatusResponse result = action.execute();

            for (MessageResponse status : result.getList()) {
                System.out.println(status.getNumber() + " " + status.getStatus());
            }
            return ResponseEntity.ok().body(message);
        } catch (ClientException e) {
            /**
             * 101 Niepoprawne lub brak danych autoryzacji.
             * 102 Nieprawidłowy login lub hasło
             * 103 Brak punków dla tego użytkownika
             * 105 Błędny adres IP
             * 110 Usługa nie jest dostępna na danym koncie
             * 1000 Akcja dostępna tylko dla użytkownika głównego
             * 1001 Nieprawidłowa akcja
             */

            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

        } catch (SmsapiException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

    }
}
