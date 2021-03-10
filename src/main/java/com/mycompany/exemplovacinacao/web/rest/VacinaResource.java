package com.mycompany.exemplovacinacao.web.rest;

import com.mycompany.exemplovacinacao.domain.Vacina;
import com.mycompany.exemplovacinacao.repository.VacinaRepository;
import com.mycompany.exemplovacinacao.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.exemplovacinacao.domain.Vacina}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class VacinaResource {

    private final Logger log = LoggerFactory.getLogger(VacinaResource.class);

    private static final String ENTITY_NAME = "vacina";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VacinaRepository vacinaRepository;

    public VacinaResource(VacinaRepository vacinaRepository) {
        this.vacinaRepository = vacinaRepository;
    }

    /**
     * {@code POST  /vacinas} : Create a new vacina.
     *
     * @param vacina the vacina to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new vacina, or with status {@code 400 (Bad Request)} if the vacina has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/vacinas")
    public ResponseEntity<Vacina> createVacina(@RequestBody Vacina vacina) throws URISyntaxException {
        log.debug("REST request to save Vacina : {}", vacina);
        if (vacina.getId() != null) {
            throw new BadRequestAlertException("A new vacina cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Vacina result = vacinaRepository.save(vacina);
        return ResponseEntity.created(new URI("/api/vacinas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /vacinas} : Updates an existing vacina.
     *
     * @param vacina the vacina to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated vacina,
     * or with status {@code 400 (Bad Request)} if the vacina is not valid,
     * or with status {@code 500 (Internal Server Error)} if the vacina couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/vacinas")
    public ResponseEntity<Vacina> updateVacina(@RequestBody Vacina vacina) throws URISyntaxException {
        log.debug("REST request to update Vacina : {}", vacina);
        if (vacina.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Vacina result = vacinaRepository.save(vacina);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, vacina.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /vacinas} : get all the vacinas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of vacinas in body.
     */
    @GetMapping("/vacinas")
    public List<Vacina> getAllVacinas() {
        log.debug("REST request to get all Vacinas");
        return vacinaRepository.findAll();
    }

    /**
     * {@code GET  /vacinas/:id} : get the "id" vacina.
     *
     * @param id the id of the vacina to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the vacina, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/vacinas/{id}")
    public ResponseEntity<Vacina> getVacina(@PathVariable Long id) {
        log.debug("REST request to get Vacina : {}", id);
        Optional<Vacina> vacina = vacinaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(vacina);
    }

    /**
     * {@code DELETE  /vacinas/:id} : delete the "id" vacina.
     *
     * @param id the id of the vacina to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/vacinas/{id}")
    public ResponseEntity<Void> deleteVacina(@PathVariable Long id) {
        log.debug("REST request to delete Vacina : {}", id);
        vacinaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
