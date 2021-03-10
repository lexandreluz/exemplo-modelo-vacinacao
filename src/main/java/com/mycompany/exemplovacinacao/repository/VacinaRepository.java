package com.mycompany.exemplovacinacao.repository;

import com.mycompany.exemplovacinacao.domain.Vacina;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Vacina entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VacinaRepository extends JpaRepository<Vacina, Long> {
}
