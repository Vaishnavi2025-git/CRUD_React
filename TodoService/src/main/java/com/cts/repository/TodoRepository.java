package com.cts.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cts.entity.Todo;

public interface TodoRepository extends JpaRepository<Todo, Long> {}

