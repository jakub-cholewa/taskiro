package com.io.Taskiro.model;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface TaskRepository extends JpaRepository<Task, Long> {
    Task findByTitle(String title);
    Collection<Task> findByUserId(Long userId);
}