package com.mycompany.exemplovacinacao.repository;

import com.mycompany.exemplovacinacao.domain.Pais;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Pais entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PaisRepository extends JpaRepository<Pais, Long> {
}
