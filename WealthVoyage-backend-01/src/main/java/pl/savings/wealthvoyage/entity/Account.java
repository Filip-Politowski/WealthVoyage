package pl.savings.wealthvoyage.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "account")
@Data
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "user_email")
    private String userEmail;

    @Column (name = "account_name")
    private String accountName;

    @Column(name = "balance")
    private double balance;


}
