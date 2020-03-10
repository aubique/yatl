package dev.aubique.yatl.model;

import com.google.gson.annotations.Expose;
import lombok.*;

import javax.persistence.*;

/**
 * Simple JavaBean domain object representing one _todo card.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "todo")
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Expose
    private Long id;

    @Expose
    @Column(name = "completed", nullable = false)
    private Boolean completed;

    @Expose
    @Column(name = "title", length = 32, nullable = false)
    private String title;

    @Expose
    @Column(name = "description", length = 255)
    private String description;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
