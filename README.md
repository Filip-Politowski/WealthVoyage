# Wealth Voyage
# Opis projektu

Głównym celem projektu jest ułatwienie użytkownikowi zarządzania domowymi finansami. W tym celu użytkownik ma do dyspozycji szereg funkcji umożliwiających śledzenie oraz dokumentację przychodów, wydatków, rat i oszczędności. Aby ułatwić monitorowanie bilansu dochodów i wydatków, użytkownik ma dostęp do wielu wykresów i tabel. Dodatkowo aplikacja oferuje opcję śledzenia kursów trzech głównych walut najczęściej używanych w naszym regionie. Informacje pobierane są bezpośrednio z bazy danych NBP. Aplikacja została zbudowana z wykorzystaniem technologii backendowej i frontendowej. Backend napisany jest w Javie 17 oraz Spring Boot 3.2.2, a baza danych korzysta z MySQL. Część frontendowa napisana jest w TypeScript, React, HTML i SCSS. Backend stanowi aplikację RESTową, a frontend komunikuje się z odpowiednimi endpointami w celu uzyskania informacji z bazy danych. Całość zabezpieczona jest za pomocą Spring Security 6 i JWT tokenów.

# Funkcje
* Rejestracja oraz logowanie
* Automatyczne odświeżanie tokena bezpieczeństwa
* Śledzenie oszczędności, wydatków oraz przychodów na wykresach
* Przeliczanie walut obcych (USD, EUR, GBP)
* Sortowanie danych
* Śledzenie ostatnich transakcji
* Podsumowanie podstawowych danych w danym miesiącu
* Tworzenie i śledzenie celów oszczędnościowych
* Możliwość monitorowania kredytów nieoprocentowanych
* Monitorowanie i dodawanie źródeł przychodów z podziałem na poszczególne typy
* Monitorowanie i dodawanie wydatków z podziałem na typy
* Tworzenie wydatków planowanych na wzór checklisty, możliwość nadawania priorytetów i odhaczania opłaconych kosztów


# Technologie i Narzędzia:
### Backend:

* Java 17
* Spring Boot 3.2.2
* Spring Security 6.2.1 (do obsługi autentykacji i autoryzacji)
* Hibernate (do mapowania obiektowo-relacyjnego)
* Lombok
* Maven 3.9.4
* IntelliJ


### Frontend:

* TypeScript 4.9.5
* React 18.2.0 (do budowy interfejsu użytkownika)
* scss
* HTML
* Node.js 18.14.1
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

# Struktura projektu:
## Backend:
* Klasy konfiguracyjne
* Encje
* Klasy transferowe DTO
* Repozytoria Spring Data JPA
* Warstwy serwisów
* Kontrolery
* Mappery
* Scheduled tasks
## Frontend:
* Components
* Hooks
* Pages
* Services
* Styles
* Utils
* App.ts
* index.ts
* Routes
* Models
## Baza danych
![](WealthVoyage-backend-01/images/wealth_voyage_db.png)

# Autoryzacja i uwierzytelnienie
API wykorzystuje autoryzację przez nagłówek (Header) z użyciem JWT tokenów.
Każde zapytanie do chronionego zasobu musi zawierać poprawnie sformułowany nagłówek 'Authorization', który zawiera JWT token.
Tokeny mają określony czas ważności; po jego upływie należy przesłać do serwera refresh token, otrzymany przy logowaniu, aby uzyskać nowy czasowy token.

Przykład nagłówka 'Authorization':
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

# Endpointy API
Aplikacja ma tylko dwa niezabezpieczone endpointy, które służą do rejestracji oraz logowania. 
Endpointy te generują token autoryzacyjny umożliwiający dostęp do aplikacji.
* Endpoint rejestracji ```localhost:8080/api/auth/register```
```JSON
{
  "username": "John2#4",
  "password": "examplePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.Doe.example@gmail.com"
}
```
* Endpoint logowania ```localhost:8080/api/auth/authenticate```
```JSON
{
  "username": "John2#4",
  "password": "examplePassword123"
  
}
```
Wszystkie inne endpointy muszą posiadać poprawnie sformułowany nagłówek 'Authorization' w celu uwierzytelnienia użytkownika.
# Przykładowe widoki aplikacji
![](WealthVoyage-backend-01/images/welcome-page.png)
![](WealthVoyage-backend-01/images/sign in.png)
![](WealthVoyage-backend-01/images/dashboard.png)
![](WealthVoyage-backend-01/images/Planed expense.png)
![](WealthVoyage-backend-01/images/recurring expenses.png)
![](WealthVoyage-backend-01/images/transactions.png)
![](WealthVoyage-backend-01/images/window to adding elements.png)
# Uruchomienie projektu
## Backend
Aby uruchomić część backendową, należy sprawdzić, czy na komputerze zainstalowane jest odpowiednie `JDK`. W tym celu należy wpisać w terminalu komendę `java -version`. Jeśli JDK nie jest zainstalowane, można pobrać i zainstalować je z oficjalnej strony ORACLE.
Po instalacji JDK można ponownie sprawdzić powyższą komendą, czy zostało poprawnie zainstalowane.
***
Następnie, należy sprawdzić, czy `MySQL` jest zainstalowane na komputerze.
W tym celu należy wpisać w terminalu komendę `mysql --version`. Jeśli MySQL nie jest zainstalowane, można pobrać je z oficjalnej strony `https://www.mysql.com/`. Po skonfigurowaniu MySQL Workbench, należy stworzyć nową bazę danych o nazwie wealth_voyage_db. 
W aplikacji znajdują się pliki z rozszerzeniem .sql do zaimportowania, które wgrywają tabele z przykładowymi danymi.
W pliku application.properties w folderze resources należy zmienić konfigurację użytkownika oraz hasła.
***
Po konfiguracji bazy danych należy sprawdzić, czy na komputerze zainstalowany jest maven. W tym celu w terminalu należy wpisać komendę ```mvn -v```. W przypadku gdy maven nie znajduję się na komputerze można pobrać go z oficjalnej strony maven```https://maven.apache.org/```.
Po pobraniu odpowiedniej paczki należy ją rozpakować i dodać do zmiennych środowiskowych (szersza instrukcja na stronie Apache). Po tych czynnościach ponownie sprawdzamy, czy maven został poprawnie dodany.
***
Po dodaniu: JDK, MySQL oraz Maven można przejść do uruchomienia aplikacji. W tym celu należy przejść do folderu gdzie znajduje się plik ```pom.xml``` i uruchomić terminal. W terminalu należy wpisać komendę``` mvn clean install```, a następnie komendę ```mvn spring-boot:run```.
Po tych czynnościach projekt powinien się skompilować.
***
## Frontend
Aby móc uruchomić część frontendową należy sprawdzić, czy na komputerze znajduję się ```node.js```. W tym celu w terminalu wpisujemy komendę ```nove -v ```. Jeśli node.js nie jest zainstalowany na komputerze, należy pobrać go z oficjalnej strony ```https://nodejs.org/en```.
Po instalacji sprawdzamy jeszcze raz czy na komputerze znajduje się node.js oraz, czy znajduje się ```npm```. W celu sprawdzenia, czy npm się poprawnie dodał należy wpisać komendę ```npm -v```.
***
Po zainstalowaniu node.js należy przejść do folderu, w którym znajduję się, plik package.json i tam otworzyć terminal. W terminalu należy wpisać komendę ```npm install```, a następnie ```npm start```. Po krótkiej chwili w przeglądarce powinna odpalić się strona powitalna aplikacji.

## Logowanie/Rejestracja
Jeśli baza danych jest poprawnie skonfigurowana i ma działającą komunikację, w ekranie logowania można zalogować się na przykładowe konto z przygotowanymi wcześniej danymi.
#### Login:
admin
#### Hasło:
password

W sytuacji, gdy nie chcemy korzystać z konta przykładowego, można stworzyć nowe konto w oknie rejestracji.
# Dalsze rzeczy do rozwijania
* Dodanie funkcji przypomnienia hasła
* Dodanie funkcji śledzenia rat oprocentowanych
* Dodanie funkcji wydruku bilansu transakcji z ostatniego miesiąca
* Dodanie funkcji edycji profilu
* Dodanie funkcji powiadomień na dzwoneczku
* Dodanie funkcji zmiany języka
* Dodanie funkcji zmiany z trybu ciemnego na jasny
* Dodanie obsługi customowych wyjątków
* Dodanie testów jednostkowych
* Dodanie panelu administratora
* Dodanie swaggera
* Optymalizacja i poprawa kodu
* Dokeryzacja całego projektu
* Wrzuceniu projektu do chmury




