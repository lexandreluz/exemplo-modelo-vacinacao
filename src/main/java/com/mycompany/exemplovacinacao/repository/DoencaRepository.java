package com.mycompany.exemplovacinacao.repository;

import com.mycompany.exemplovacinacao.domain.Doenca;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Doenca entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DoencaRepository extends JpaRepository<Doenca, Long> {
}
