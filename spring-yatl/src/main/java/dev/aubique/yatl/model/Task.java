package dev.aubique.yatl.model;

import com.google.gson.annotations.Expose;
import lombok.*;

import javax.persistence.*;

/**
 * Simple JavaBean domain object representing final Task
 * That's the one-to-one Child of {@link TaskCore} instance
 * It stores the final entity which is exposed from API
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "task")
public class Task {

    @Id
    private Long id;

    @ToString.Exclude
    @Expose
    @MapsId
    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "task_id")
    private TaskCore taskCore;

    @Expose
    @Column(name = "title", length = 32, nullable = false)
    private String title;

    @Expose
    @Column(name = "complete", nullable = false)
    private Boolean complete;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
