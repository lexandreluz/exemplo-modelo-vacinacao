package com.mycompany.exemplovacinacao.web.rest;

import com.mycompany.exemplovacinacao.domain.VacinacaoPessoa;
import com.mycompany.exemplovacinacao.repository.VacinacaoPessoaRepository;
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
 * REST controller for managing {@link com.mycompany.exemplovacinacao.domain.VacinacaoPessoa}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class VacinacaoPessoaResource {

    private final Logger log = LoggerFactory.getLogger(VacinacaoPessoaResource.class);

    private static final String ENTITY_NAME = "vacinacaoPessoa";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VacinacaoPessoaRepository vacinacaoPessoaRepository;

    public VacinacaoPessoaResource(VacinacaoPessoaRepository vacinacaoPessoaRepository) {
        this.vacinacaoPessoaRepository = vacinacaoPessoaRepository;
    }

    /**
     * {@code POST  /vacinacao-pessoas} : Create a new vacinacaoPessoa.
     *
     * @param vacinacaoPessoa the vacinacaoPessoa to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new vacinacaoPessoa, or with status {@code 400 (Bad Request)} if the vacinacaoPessoa has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/vacinacao-pessoas")
    public ResponseEntity<VacinacaoPessoa> createVacinacaoPessoa(@RequestBody VacinacaoPessoa vacinacaoPessoa) throws URISyntaxException {
        log.debug("REST request to save VacinacaoPessoa : {}", vacinacaoPessoa);
        if (vacinacaoPessoa.getId() != null) {
            throw new BadRequestAlertException("A new vacinacaoPessoa cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VacinacaoPessoa result = vacinacaoPessoaRepository.save(vacinacaoPessoa);
        return ResponseEntity.created(new URI("/api/vacinacao-pessoas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /vacinacao-pessoas} : Updates an existing vacinacaoPessoa.
     *
     * @param vacinacaoPessoa the vacinacaoPessoa to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated vacinacaoPessoa,
     * or with status {@code 400 (Bad Request)} if the vacinacaoPessoa is not valid,
     * or with status {@code 500 (Internal Server Error)} if the vacinacaoPessoa couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/vacinacao-pessoas")
    public ResponseEntity<VacinacaoPessoa> updateVacinacaoPessoa(@RequestBody VacinacaoPessoa vacinacaoPessoa) throws URISyntaxException {
        log.debug("REST request to update VacinacaoPessoa : {}", vacinacaoPessoa);
        if (vacinacaoPessoa.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        VacinacaoPessoa result = vacinacaoPessoaRepository.save(vacinacaoPessoa);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, vacinacaoPessoa.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /vacinacao-pessoas} : get all the vacinacaoPessoas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of vacinacaoPessoas in body.
     */
    @GetMapping("/vacinacao-pessoas")
    public List<VacinacaoPessoa> getAllVacinacaoPessoas() {
        log.debug("REST request to get all VacinacaoPessoas");
        return vacinacaoPessoaRepository.findAll();
    }

    /**
     * {@code GET  /vacinacao-pessoas/:id} : get the "id" vacinacaoPessoa.
     *
     * @param id the id of the vacinacaoPessoa to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the vacinacaoPessoa, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/vacinacao-pessoas/{id}")
    public ResponseEntity<VacinacaoPessoa> getVacinacaoPessoa(@PathVariable Long id) {
        log.debug("REST request to get VacinacaoPessoa : {}", id);
        Optional<VacinacaoPessoa> vacinacaoPessoa = vacinacaoPessoaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(vacinacaoPessoa);
    }

    /**
     * {@code DELETE  /vacinacao-pessoas/:id} : delete the "id" vacinacaoPessoa.
     *
     * @param id the id of the vacinacaoPessoa to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/vacinacao-pessoas/{id}")
    public ResponseEntity<Void> deleteVacinacaoPessoa(@PathVariable Long id) {
        log.debug("REST request to delete VacinacaoPessoa : {}", id);
        vacinacaoPessoaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
