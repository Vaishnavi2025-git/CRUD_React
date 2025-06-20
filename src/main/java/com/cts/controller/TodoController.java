package com.cts.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cts.entity.Todo;
import com.cts.repository.TodoRepository;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {

  @Autowired
  private TodoRepository repository;

  @GetMapping
  public List<Todo> getAll() {

      return repository.findAll();
  }

  @PostMapping("/post")
  public Todo create(@RequestBody Todo todo) {
    return repository.save(todo);
  }

  @PutMapping("/{id}")
  public Todo update(@PathVariable Long id, @RequestBody Todo todo) {
    Todo existing = repository.findById(id).orElseThrow();
    existing.setTask(todo.getTask());
    return repository.save(existing);
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable Long id) {
    repository.deleteById(id);
  }
}
