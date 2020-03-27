package dev.aubique.yatl.model;

import com.google.gson.annotations.Expose;
import lombok.Data;

/**
 * Simple JavaBean object that represents Data Transfer Object for API
 * Designed for PATCH HTTP requests to partially update {@link TaskCore}
 * It stores the temporary information about complete-incomplete Task state
 */
@Data
public class TaskCompleteDto {

    @Expose
    private Boolean complete;
}
