# Wealth Voyage
# Opis projektu
Głównym celem projektu jest ułatwienie użytkownikowi zarządzania jego domowymi finansami. W tym celu użytkownik ma do dyspozycji szereg funkcji umożliwiających śledzenie oraz dokumentację przychodów, wydatków, rat oraz oszczędności. Aby ułatwić śledzenie bilansu dochodów i wydatków, użytkownik ma do dyspozycji wiele wykresów oraz tabel. Dodatkowo aplikacja posiada opcje śledzenia kursów trzech głównych walut najczęściej używanych na naszym terenie. Informacje pobierane są bezpośrednio z bazy danych NBP. Aplikacja pisana jest po stronie backend oraz frontend. Do stworzenia części backendu wykorzystana została Java 17 oraz spring boot w wersji 3.2.2. Baza danych korzysta z MySQL. Część frontendowa pisana jest w TypeScript, React, HTML, scss. Backend napisany jest jako aplikacja Restowa i frontend odpytuje odpowiednie endpointy w celu uzyskania odpowiednich informacji z bazy danych. Całość zabezpieczona jest za pomocą Spring Security w wersji 6 oraz JWT tokenów.   


# Technologie i Narzędzia:  
### Backend:

* Java 17
* Spring Boot 3.2.2
* Spring Security 6.2.1 (do obsługi autentykacji i autoryzacji)
* Hibernate (do mapowania obiektowo-relacyjnego)
* Lombok
* Maven
* IntelliJ

 
### Frontend:

* TypeScript 
* React (do budowy interfejsu użytkownika)
* scss 
* HTML
* Node.js
* NPM
* VS Code
  
### Baza Danych:

* MySQL
### Autentykacja i Bezpieczeństwo:

* JWT (do autoryzacji oraz autentykacji użytkownika)
* Spring Security 6.2.1
### Inne:
* Git 
* Postman
 