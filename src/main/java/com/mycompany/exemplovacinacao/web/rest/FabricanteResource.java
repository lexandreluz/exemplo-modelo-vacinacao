package com.mycompany.exemplovacinacao.web.rest;

import com.mycompany.exemplovacinacao.domain.Fabricante;
import com.mycompany.exemplovacinacao.repository.FabricanteRepository;
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
 * REST controller for managing {@link com.mycompany.exemplovacinacao.domain.Fabricante}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FabricanteResource {

    private final Logger log = LoggerFactory.getLogger(FabricanteResource.class);

    private static final String ENTITY_NAME = "fabricante";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FabricanteRepository fabricanteRepository;

    public FabricanteResource(FabricanteRepository fabricanteRepository) {
        this.fabricanteRepository = fabricanteRepository;
    }

    /**
     * {@code POST  /fabricantes} : Create a new fabricante.
     *
     * @param fabricante the fabricante to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new fabricante, or with status {@code 400 (Bad Request)} if the fabricante has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/fabricantes")
    public ResponseEntity<Fabricante> createFabricante(@RequestBody Fabricante fabricante) throws URISyntaxException {
        log.debug("REST request to save Fabricante : {}", fabricante);
        if (fabricante.getId() != null) {
            throw new BadRequestAlertException("A new fabricante cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Fabricante result = fabricanteRepository.save(fabricante);
        return ResponseEntity.created(new URI("/api/fabricantes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /fabricantes} : Updates an existing fabricante.
     *
     * @param fabricante the fabricante to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated fabricante,
     * or with status {@code 400 (Bad Request)} if the fabricante is not valid,
     * or with status {@code 500 (Internal Server Error)} if the fabricante couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/fabricantes")
    public ResponseEntity<Fabricante> updateFabricante(@RequestBody Fabricante fabricante) throws URISyntaxException {
        log.debug("REST request to update Fabricante : {}", fabricante);
        if (fabricante.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Fabricante result = fabricanteRepository.save(fabricante);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, fabricante.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /fabricantes} : get all the fabricantes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of fabricantes in body.
     */
    @GetMapping("/fabricantes")
    public List<Fabricante> getAllFabricantes() {
        log.debug("REST request to get all Fabricantes");
        return fabricanteRepository.findAll();
    }

    /**
     * {@code GET  /fabricantes/:id} : get the "id" fabricante.
     *
     * @param id the id of the fabricante to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the fabricante, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/fabricantes/{id}")
    public ResponseEntity<Fabricante> getFabricante(@PathVariable Long id) {
        log.debug("REST request to get Fabricante : {}", id);
        Optional<Fabricante> fabricante = fabricanteRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(fabricante);
    }

    /**
     * {@code DELETE  /fabricantes/:id} : delete the "id" fabricante.
     *
     * @param id the id of the fabricante to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/fabricantes/{id}")
    public ResponseEntity<Void> deleteFabricante(@PathVariable Long id) {
        log.debug("REST request to delete Fabricante : {}", id);
        fabricanteRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
