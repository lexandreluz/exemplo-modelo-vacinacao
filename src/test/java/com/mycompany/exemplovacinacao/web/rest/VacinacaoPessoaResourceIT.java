package com.mycompany.exemplovacinacao.web.rest;

import com.mycompany.exemplovacinacao.ExemploVacinacaoApp;
import com.mycompany.exemplovacinacao.domain.VacinacaoPessoa;
import com.mycompany.exemplovacinacao.repository.VacinacaoPessoaRepository;

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
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link VacinacaoPessoaResource} REST controller.
 */
@SpringBootTest(classes = ExemploVacinacaoApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class VacinacaoPessoaResourceIT {

    private static final LocalDate DEFAULT_QUANDO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_QUANDO = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_CNS = "AAAAAAAAAA";
    private static final String UPDATED_CNS = "BBBBBBBBBB";

    @Autowired
    private VacinacaoPessoaRepository vacinacaoPessoaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restVacinacaoPessoaMockMvc;

    private VacinacaoPessoa vacinacaoPessoa;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VacinacaoPessoa createEntity(EntityManager em) {
        VacinacaoPessoa vacinacaoPessoa = new VacinacaoPessoa()
            .quando(DEFAULT_QUANDO)
            .cns(DEFAULT_CNS);
        return vacinacaoPessoa;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VacinacaoPessoa createUpdatedEntity(EntityManager em) {
        VacinacaoPessoa vacinacaoPessoa = new VacinacaoPessoa()
            .quando(UPDATED_QUANDO)
            .cns(UPDATED_CNS);
        return vacinacaoPessoa;
    }

    @BeforeEach
    public void initTest() {
        vacinacaoPessoa = createEntity(em);
    }

    @Test
    @Transactional
    public void createVacinacaoPessoa() throws Exception {
        int databaseSizeBeforeCreate = vacinacaoPessoaRepository.findAll().size();
        // Create the VacinacaoPessoa
        restVacinacaoPessoaMockMvc.perform(post("/api/vacinacao-pessoas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(vacinacaoPessoa)))
            .andExpect(status().isCreated());

        // Validate the VacinacaoPessoa in the database
        List<VacinacaoPessoa> vacinacaoPessoaList = vacinacaoPessoaRepository.findAll();
        assertThat(vacinacaoPessoaList).hasSize(databaseSizeBeforeCreate + 1);
        VacinacaoPessoa testVacinacaoPessoa = vacinacaoPessoaList.get(vacinacaoPessoaList.size() - 1);
        assertThat(testVacinacaoPessoa.getQuando()).isEqualTo(DEFAULT_QUANDO);
        assertThat(testVacinacaoPessoa.getCns()).isEqualTo(DEFAULT_CNS);
    }

    @Test
    @Transactional
    public void createVacinacaoPessoaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = vacinacaoPessoaRepository.findAll().size();

        // Create the VacinacaoPessoa with an existing ID
        vacinacaoPessoa.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVacinacaoPessoaMockMvc.perform(post("/api/vacinacao-pessoas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(vacinacaoPessoa)))
            .andExpect(status().isBadRequest());

        // Validate the VacinacaoPessoa in the database
        List<VacinacaoPessoa> vacinacaoPessoaList = vacinacaoPessoaRepository.findAll();
        assertThat(vacinacaoPessoaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllVacinacaoPessoas() throws Exception {
        // Initialize the database
        vacinacaoPessoaRepository.saveAndFlush(vacinacaoPessoa);

        // Get all the vacinacaoPessoaList
        restVacinacaoPessoaMockMvc.perform(get("/api/vacinacao-pessoas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(vacinacaoPessoa.getId().intValue())))
            .andExpect(jsonPath("$.[*].quando").value(hasItem(DEFAULT_QUANDO.toString())))
            .andExpect(jsonPath("$.[*].cns").value(hasItem(DEFAULT_CNS)));
    }
    
    @Test
    @Transactional
    public void getVacinacaoPessoa() throws Exception {
        // Initialize the database
        vacinacaoPessoaRepository.saveAndFlush(vacinacaoPessoa);

        // Get the vacinacaoPessoa
        restVacinacaoPessoaMockMvc.perform(get("/api/vacinacao-pessoas/{id}", vacinacaoPessoa.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(vacinacaoPessoa.getId().intValue()))
            .andExpect(jsonPath("$.quando").value(DEFAULT_QUANDO.toString()))
            .andExpect(jsonPath("$.cns").value(DEFAULT_CNS));
    }
    @Test
    @Transactional
    public void getNonExistingVacinacaoPessoa() throws Exception {
        // Get the vacinacaoPessoa
        restVacinacaoPessoaMockMvc.perform(get("/api/vacinacao-pessoas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVacinacaoPessoa() throws Exception {
        // Initialize the database
        vacinacaoPessoaRepository.saveAndFlush(vacinacaoPessoa);

        int databaseSizeBeforeUpdate = vacinacaoPessoaRepository.findAll().size();

        // Update the vacinacaoPessoa
        VacinacaoPessoa updatedVacinacaoPessoa = vacinacaoPessoaRepository.findById(vacinacaoPessoa.getId()).get();
        // Disconnect from session so that the updates on updatedVacinacaoPessoa are not directly saved in db
        em.detach(updatedVacinacaoPessoa);
        updatedVacinacaoPessoa
            .quando(UPDATED_QUANDO)
            .cns(UPDATED_CNS);

        restVacinacaoPessoaMockMvc.perform(put("/api/vacinacao-pessoas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedVacinacaoPessoa)))
            .andExpect(status().isOk());

        // Validate the VacinacaoPessoa in the database
        List<VacinacaoPessoa> vacinacaoPessoaList = vacinacaoPessoaRepository.findAll();
        assertThat(vacinacaoPessoaList).hasSize(databaseSizeBeforeUpdate);
        VacinacaoPessoa testVacinacaoPessoa = vacinacaoPessoaList.get(vacinacaoPessoaList.size() - 1);
        assertThat(testVacinacaoPessoa.getQuando()).isEqualTo(UPDATED_QUANDO);
        assertThat(testVacinacaoPessoa.getCns()).isEqualTo(UPDATED_CNS);
    }

    @Test
    @Transactional
    public void updateNonExistingVacinacaoPessoa() throws Exception {
        int databaseSizeBeforeUpdate = vacinacaoPessoaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVacinacaoPessoaMockMvc.perform(put("/api/vacinacao-pessoas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(vacinacaoPessoa)))
            .andExpect(status().isBadRequest());

        // Validate the VacinacaoPessoa in the database
        List<VacinacaoPessoa> vacinacaoPessoaList = vacinacaoPessoaRepository.findAll();
        assertThat(vacinacaoPessoaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVacinacaoPessoa() throws Exception {
        // Initialize the database
        vacinacaoPessoaRepository.saveAndFlush(vacinacaoPessoa);

        int databaseSizeBeforeDelete = vacinacaoPessoaRepository.findAll().size();

        // Delete the vacinacaoPessoa
        restVacinacaoPessoaMockMvc.perform(delete("/api/vacinacao-pessoas/{id}", vacinacaoPessoa.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<VacinacaoPessoa> vacinacaoPessoaList = vacinacaoPessoaRepository.findAll();
        assertThat(vacinacaoPessoaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
