# Funkcjonalności:
### Rejestracja i Logowanie:

Umożliw użytkownikom rejestrację i logowanie się do swoich kont.
Implementacja weryfikacji dwuetapowej dla zwiększenia bezpieczeństwa.
### Dashboard:

Wyświetlanie podstawowych statystyk budżetowych, takich jak saldo, miesięczne dochody i wydatki.
Zarządzanie Kontami Bankowymi:

### Dodawanie i zarządzanie różnymi kontami bankowymi.
Monitorowanie aktualnych sald.
### Transakcje:

Dodawanie transakcji (dochód, wydatek).
Kategoryzacja transakcji (np. jedzenie, transport, rozrywka).
Historia transakcji.
### Cel Oszczędnościowy:

Tworzenie celów oszczędnościowych (np. na wakacje, nowy sprzęt).
Śledzenie postępu w realizacji celów.
### Budżet Miesięczny:

Ustalanie i monitorowanie budżetu miesięcznego dla różnych kategorii wydatków.
### Raty i Kredyty:

Dodawanie informacji o obecnych ratach i zobowiązaniach kredytowych.
### Raporty i Wykresy:

Generowanie raportów i wykresów prezentujących trendy finansowe.
### Ustawienia Profilu:

Edycja danych osobowych.

# Przykładowa Baza Danych:
### User Table:

ID (Primary Key)
Login  
Hasło (zabezpieczone i zahashowane)  
Email  
Data utworzenia konta  
### Account Table:

ID (Primary Key)  
ID Użytkownika (Foreign Key)  
Nazwa konta  
Saldo  
### Transaction Table:  

ID (Primary Key)  
ID Użytkownika (Foreign Key)  
Kwota  
Typ transakcji (dochód/wydatek)  
Kategoria  
Data transakcji  
### Saving Goal Table:  

ID (Primary Key)  
ID Użytkownika (Foreign Key)  
Nazwa celu  
Kwota celu  
Kwota oszczędzona  
Progres oszczędzania  
# Technologie i Narzędzia:  
### Backend:

* Java
* Spring Boot
* Spring Security (do obsługi autentykacji i autoryzacji)
* Hibernate (do mapowania obiektowo-relacyjnego)
* Lombok
* Maven

 
### Frontend:

* JavaScript
* React (do budowy interfejsu użytkownika)
### Baza Danych:

* MySQL
### Autentykacja i Bezpieczeństwo:

* JWT (do zarządzania sesjami)
* Spring Security
### Inne:

* Okta (do zarządzania tożsamością i autentykacją)
* Narzędzia do zarządzania projektem (np. Git, Jira)