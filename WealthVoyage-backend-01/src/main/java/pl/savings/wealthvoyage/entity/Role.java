package pl.savings.wealthvoyage.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;

@Setter
@Entity
@Table(name="authorities")
public class Role implements GrantedAuthority {

    @Getter
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name="authorities_id")
    private Integer authoritiesId;

    private String authority;

    public Role(){
        super();
    }

    public Role(String authority){
        this.authority = authority;
    }

    public Role(Integer authoritiesId, String authority){
        this.authoritiesId = authoritiesId;
        this.authority = authority;
    }

    @Override
    public String getAuthority() {
        return this.authority;
    }

}
