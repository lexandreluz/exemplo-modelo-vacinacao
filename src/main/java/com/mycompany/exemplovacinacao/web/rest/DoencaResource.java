package com.mycompany.exemplovacinacao.web.rest;

import com.mycompany.exemplovacinacao.domain.Doenca;
import com.mycompany.exemplovacinacao.repository.DoencaRepository;
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
 * REST controller for managing {@link com.mycompany.exemplovacinacao.domain.Doenca}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DoencaResource {

    private final Logger log = LoggerFactory.getLogger(DoencaResource.class);

    private static final String ENTITY_NAME = "doenca";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DoencaRepository doencaRepository;

    public DoencaResource(DoencaRepository doencaRepository) {
        this.doencaRepository = doencaRepository;
    }

    /**
     * {@code POST  /doencas} : Create a new doenca.
     *
     * @param doenca the doenca to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new doenca, or with status {@code 400 (Bad Request)} if the doenca has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/doencas")
    public ResponseEntity<Doenca> createDoenca(@RequestBody Doenca doenca) throws URISyntaxException {
        log.debug("REST request to save Doenca : {}", doenca);
        if (doenca.getId() != null) {
            throw new BadRequestAlertException("A new doenca cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Doenca result = doencaRepository.save(doenca);
        return ResponseEntity.created(new URI("/api/doencas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /doencas} : Updates an existing doenca.
     *
     * @param doenca the doenca to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated doenca,
     * or with status {@code 400 (Bad Request)} if the doenca is not valid,
     * or with status {@code 500 (Internal Server Error)} if the doenca couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/doencas")
    public ResponseEntity<Doenca> updateDoenca(@RequestBody Doenca doenca) throws URISyntaxException {
        log.debug("REST request to update Doenca : {}", doenca);
        if (doenca.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Doenca result = doencaRepository.save(doenca);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, doenca.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /doencas} : get all the doencas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of doencas in body.
     */
    @GetMapping("/doencas")
    public List<Doenca> getAllDoencas() {
        log.debug("REST request to get all Doencas");
        return doencaRepository.findAll();
    }

    /**
     * {@code GET  /doencas/:id} : get the "id" doenca.
     *
     * @param id the id of the doenca to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the doenca, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/doencas/{id}")
    public ResponseEntity<Doenca> getDoenca(@PathVariable Long id) {
        log.debug("REST request to get Doenca : {}", id);
        Optional<Doenca> doenca = doencaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(doenca);
    }

    /**
     * {@code DELETE  /doencas/:id} : delete the "id" doenca.
     *
     * @param id the id of the doenca to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/doencas/{id}")
    public ResponseEntity<Void> deleteDoenca(@PathVariable Long id) {
        log.debug("REST request to delete Doenca : {}", id);
        doencaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
