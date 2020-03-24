package dev.aubique.yatl.model;

import com.google.gson.annotations.Expose;
import lombok.Data;

@Data
public class TaskPriorityDto {

    @Expose
    private Boolean complete;
}
