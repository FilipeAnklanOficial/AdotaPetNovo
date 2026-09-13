package com.extensao.adotapet.Animal;

import com.extensao.adotapet.Enum.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface AnimalRepository extends JpaRepository<Animal, Long>,
        JpaSpecificationExecutor<Animal> {
    List<Animal> findByStatus(Status status);
}