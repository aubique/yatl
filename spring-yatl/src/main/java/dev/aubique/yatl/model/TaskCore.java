package dev.aubique.yatl.model;

import com.google.gson.annotations.Expose;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * Simple JavaBean domain object representing a TaskCore entity
 * That's the one-to-one Parent for {@link Task}
 * It stores the most frequently updated part of the task: priority within drop-list and complete-checkbox
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "task_core")
public class TaskCore {

    @Expose
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//  @Column(name = "id", nullable = false) // If we set ID manually
    private Long id;

    @Expose
    @Column(name = "priority", nullable = false)
    private Integer priority;
}
