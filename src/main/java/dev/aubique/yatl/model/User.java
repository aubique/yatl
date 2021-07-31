package dev.aubique.yatl.model;

import com.google.gson.annotations.Expose;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

/**
 * Simple JavaBean domain object representing the user who the TodoItem belongs to
 */
@Data
@Entity
@Table(name = "user")
public class User {

    @Expose
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Expose
    @Column(name = "username", length = 32)
    private String username;

    //@ToString.Exclude
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Task> taskList;
}
