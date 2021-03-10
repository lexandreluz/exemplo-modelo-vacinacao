package com.mycompany.exemplovacinacao.repository;

import com.mycompany.exemplovacinacao.domain.Fabricante;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Fabricante entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FabricanteRepository extends JpaRepository<Fabricante, Long> {
}
