package com.mycompany.exemplovacinacao.web.rest;

import com.mycompany.exemplovacinacao.ExemploVacinacaoApp;
import com.mycompany.exemplovacinacao.domain.Fabricante;
import com.mycompany.exemplovacinacao.repository.FabricanteRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.mycompany.exemplovacinacao.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link FabricanteResource} REST controller.
 */
@SpringBootTest(classes = ExemploVacinacaoApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class FabricanteResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_CRIADO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CRIADO = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private FabricanteRepository fabricanteRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFabricanteMockMvc;

    private Fabricante fabricante;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Fabricante createEntity(EntityManager em) {
        Fabricante fabricante = new Fabricante()
            .nome(DEFAULT_NOME)
            .criado(DEFAULT_CRIADO);
        return fabricante;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Fabricante createUpdatedEntity(EntityManager em) {
        Fabricante fabricante = new Fabricante()
            .nome(UPDATED_NOME)
            .criado(UPDATED_CRIADO);
        return fabricante;
    }

    @BeforeEach
    public void initTest() {
        fabricante = createEntity(em);
    }

    @Test
    @Transactional
    public void createFabricante() throws Exception {
        int databaseSizeBeforeCreate = fabricanteRepository.findAll().size();
        // Create the Fabricante
        restFabricanteMockMvc.perform(post("/api/fabricantes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fabricante)))
            .andExpect(status().isCreated());

        // Validate the Fabricante in the database
        List<Fabricante> fabricanteList = fabricanteRepository.findAll();
        assertThat(fabricanteList).hasSize(databaseSizeBeforeCreate + 1);
        Fabricante testFabricante = fabricanteList.get(fabricanteList.size() - 1);
        assertThat(testFabricante.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testFabricante.getCriado()).isEqualTo(DEFAULT_CRIADO);
    }

    @Test
    @Transactional
    public void createFabricanteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fabricanteRepository.findAll().size();

        // Create the Fabricante with an existing ID
        fabricante.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFabricanteMockMvc.perform(post("/api/fabricantes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fabricante)))
            .andExpect(status().isBadRequest());

        // Validate the Fabricante in the database
        List<Fabricante> fabricanteList = fabricanteRepository.findAll();
        assertThat(fabricanteList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFabricantes() throws Exception {
        // Initialize the database
        fabricanteRepository.saveAndFlush(fabricante);

        // Get all the fabricanteList
        restFabricanteMockMvc.perform(get("/api/fabricantes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fabricante.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].criado").value(hasItem(sameInstant(DEFAULT_CRIADO))));
    }
    
    @Test
    @Transactional
    public void getFabricante() throws Exception {
        // Initialize the database
        fabricanteRepository.saveAndFlush(fabricante);

        // Get the fabricante
        restFabricanteMockMvc.perform(get("/api/fabricantes/{id}", fabricante.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(fabricante.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.criado").value(sameInstant(DEFAULT_CRIADO)));
    }
    @Test
    @Transactional
    public void getNonExistingFabricante() throws Exception {
        // Get the fabricante
        restFabricanteMockMvc.perform(get("/api/fabricantes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFabricante() throws Exception {
        // Initialize the database
        fabricanteRepository.saveAndFlush(fabricante);

        int databaseSizeBeforeUpdate = fabricanteRepository.findAll().size();

        // Update the fabricante
        Fabricante updatedFabricante = fabricanteRepository.findById(fabricante.getId()).get();
        // Disconnect from session so that the updates on updatedFabricante are not directly saved in db
        em.detach(updatedFabricante);
        updatedFabricante
            .nome(UPDATED_NOME)
            .criado(UPDATED_CRIADO);

        restFabricanteMockMvc.perform(put("/api/fabricantes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedFabricante)))
            .andExpect(status().isOk());

        // Validate the Fabricante in the database
        List<Fabricante> fabricanteList = fabricanteRepository.findAll();
        assertThat(fabricanteList).hasSize(databaseSizeBeforeUpdate);
        Fabricante testFabricante = fabricanteList.get(fabricanteList.size() - 1);
        assertThat(testFabricante.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testFabricante.getCriado()).isEqualTo(UPDATED_CRIADO);
    }

    @Test
    @Transactional
    public void updateNonExistingFabricante() throws Exception {
        int databaseSizeBeforeUpdate = fabricanteRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFabricanteMockMvc.perform(put("/api/fabricantes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fabricante)))
            .andExpect(status().isBadRequest());

        // Validate the Fabricante in the database
        List<Fabricante> fabricanteList = fabricanteRepository.findAll();
        assertThat(fabricanteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFabricante() throws Exception {
        // Initialize the database
        fabricanteRepository.saveAndFlush(fabricante);

        int databaseSizeBeforeDelete = fabricanteRepository.findAll().size();

        // Delete the fabricante
        restFabricanteMockMvc.perform(delete("/api/fabricantes/{id}", fabricante.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Fabricante> fabricanteList = fabricanteRepository.findAll();
        assertThat(fabricanteList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
