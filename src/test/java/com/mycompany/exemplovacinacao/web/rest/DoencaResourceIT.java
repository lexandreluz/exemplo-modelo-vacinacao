package com.mycompany.exemplovacinacao.web.rest;

import com.mycompany.exemplovacinacao.ExemploVacinacaoApp;
import com.mycompany.exemplovacinacao.domain.Doenca;
import com.mycompany.exemplovacinacao.repository.DoencaRepository;

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
import java.time.LocalDate;
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
 * Integration tests for the {@link DoencaResource} REST controller.
 */
@SpringBootTest(classes = ExemploVacinacaoApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class DoencaResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_CRIADO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CRIADO = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final LocalDate DEFAULT_DATA_PRIMEIRO_CASO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_PRIMEIRO_CASO = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_LOCAL_PRIMEIRO_CASO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_LOCAL_PRIMEIRO_CASO = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private DoencaRepository doencaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDoencaMockMvc;

    private Doenca doenca;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Doenca createEntity(EntityManager em) {
        Doenca doenca = new Doenca()
            .nome(DEFAULT_NOME)
            .criado(DEFAULT_CRIADO)
            .dataPrimeiroCaso(DEFAULT_DATA_PRIMEIRO_CASO)
            .localPrimeiroCaso(DEFAULT_LOCAL_PRIMEIRO_CASO);
        return doenca;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Doenca createUpdatedEntity(EntityManager em) {
        Doenca doenca = new Doenca()
            .nome(UPDATED_NOME)
            .criado(UPDATED_CRIADO)
            .dataPrimeiroCaso(UPDATED_DATA_PRIMEIRO_CASO)
            .localPrimeiroCaso(UPDATED_LOCAL_PRIMEIRO_CASO);
        return doenca;
    }

    @BeforeEach
    public void initTest() {
        doenca = createEntity(em);
    }

    @Test
    @Transactional
    public void createDoenca() throws Exception {
        int databaseSizeBeforeCreate = doencaRepository.findAll().size();
        // Create the Doenca
        restDoencaMockMvc.perform(post("/api/doencas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(doenca)))
            .andExpect(status().isCreated());

        // Validate the Doenca in the database
        List<Doenca> doencaList = doencaRepository.findAll();
        assertThat(doencaList).hasSize(databaseSizeBeforeCreate + 1);
        Doenca testDoenca = doencaList.get(doencaList.size() - 1);
        assertThat(testDoenca.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testDoenca.getCriado()).isEqualTo(DEFAULT_CRIADO);
        assertThat(testDoenca.getDataPrimeiroCaso()).isEqualTo(DEFAULT_DATA_PRIMEIRO_CASO);
        assertThat(testDoenca.getLocalPrimeiroCaso()).isEqualTo(DEFAULT_LOCAL_PRIMEIRO_CASO);
    }

    @Test
    @Transactional
    public void createDoencaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = doencaRepository.findAll().size();

        // Create the Doenca with an existing ID
        doenca.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDoencaMockMvc.perform(post("/api/doencas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(doenca)))
            .andExpect(status().isBadRequest());

        // Validate the Doenca in the database
        List<Doenca> doencaList = doencaRepository.findAll();
        assertThat(doencaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDoencas() throws Exception {
        // Initialize the database
        doencaRepository.saveAndFlush(doenca);

        // Get all the doencaList
        restDoencaMockMvc.perform(get("/api/doencas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(doenca.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].criado").value(hasItem(sameInstant(DEFAULT_CRIADO))))
            .andExpect(jsonPath("$.[*].dataPrimeiroCaso").value(hasItem(DEFAULT_DATA_PRIMEIRO_CASO.toString())))
            .andExpect(jsonPath("$.[*].localPrimeiroCaso").value(hasItem(DEFAULT_LOCAL_PRIMEIRO_CASO.toString())));
    }
    
    @Test
    @Transactional
    public void getDoenca() throws Exception {
        // Initialize the database
        doencaRepository.saveAndFlush(doenca);

        // Get the doenca
        restDoencaMockMvc.perform(get("/api/doencas/{id}", doenca.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(doenca.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.criado").value(sameInstant(DEFAULT_CRIADO)))
            .andExpect(jsonPath("$.dataPrimeiroCaso").value(DEFAULT_DATA_PRIMEIRO_CASO.toString()))
            .andExpect(jsonPath("$.localPrimeiroCaso").value(DEFAULT_LOCAL_PRIMEIRO_CASO.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingDoenca() throws Exception {
        // Get the doenca
        restDoencaMockMvc.perform(get("/api/doencas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDoenca() throws Exception {
        // Initialize the database
        doencaRepository.saveAndFlush(doenca);

        int databaseSizeBeforeUpdate = doencaRepository.findAll().size();

        // Update the doenca
        Doenca updatedDoenca = doencaRepository.findById(doenca.getId()).get();
        // Disconnect from session so that the updates on updatedDoenca are not directly saved in db
        em.detach(updatedDoenca);
        updatedDoenca
            .nome(UPDATED_NOME)
            .criado(UPDATED_CRIADO)
            .dataPrimeiroCaso(UPDATED_DATA_PRIMEIRO_CASO)
            .localPrimeiroCaso(UPDATED_LOCAL_PRIMEIRO_CASO);

        restDoencaMockMvc.perform(put("/api/doencas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDoenca)))
            .andExpect(status().isOk());

        // Validate the Doenca in the database
        List<Doenca> doencaList = doencaRepository.findAll();
        assertThat(doencaList).hasSize(databaseSizeBeforeUpdate);
        Doenca testDoenca = doencaList.get(doencaList.size() - 1);
        assertThat(testDoenca.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testDoenca.getCriado()).isEqualTo(UPDATED_CRIADO);
        assertThat(testDoenca.getDataPrimeiroCaso()).isEqualTo(UPDATED_DATA_PRIMEIRO_CASO);
        assertThat(testDoenca.getLocalPrimeiroCaso()).isEqualTo(UPDATED_LOCAL_PRIMEIRO_CASO);
    }

    @Test
    @Transactional
    public void updateNonExistingDoenca() throws Exception {
        int databaseSizeBeforeUpdate = doencaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDoencaMockMvc.perform(put("/api/doencas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(doenca)))
            .andExpect(status().isBadRequest());

        // Validate the Doenca in the database
        List<Doenca> doencaList = doencaRepository.findAll();
        assertThat(doencaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDoenca() throws Exception {
        // Initialize the database
        doencaRepository.saveAndFlush(doenca);

        int databaseSizeBeforeDelete = doencaRepository.findAll().size();

        // Delete the doenca
        restDoencaMockMvc.perform(delete("/api/doencas/{id}", doenca.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Doenca> doencaList = doencaRepository.findAll();
        assertThat(doencaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
