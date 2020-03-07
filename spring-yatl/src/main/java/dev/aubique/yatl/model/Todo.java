package dev.aubique.yatl.model;

import com.google.gson.annotations.Expose;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;

@Data
@Entity
@Table(name = "todo")
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Expose
    private Long id;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Expose
    @Column(name = "title", length = 32)
    private String title;

    @Expose
    @Column(name = "description", length = 255)
    private String description;
}
