package com.io.Taskiro.model;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Random;

public enum TaskType {
    BROOM,
    CAR,
    SHOP,
    DOG,
    LAWN,
    LEAF,
    SNOW,
    TRASH;

    private static final List<TaskType> VALUES =
            Collections.unmodifiableList(Arrays.asList(values()));
    private static final int SIZE = VALUES.size();
    private static final Random RANDOM = new Random();

    public static TaskType randomTaskType()  {
        return VALUES.get(RANDOM.nextInt(SIZE));
    }
}
