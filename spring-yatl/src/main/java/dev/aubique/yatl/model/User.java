package dev.aubique.yatl.model;

import com.google.gson.annotations.Expose;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Expose
    private Long id;

    @Column(name = "username", length = 32)
    @Expose
    private String username;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Todo> todoList;
}
