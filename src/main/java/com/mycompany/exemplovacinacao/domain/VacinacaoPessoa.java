package com.mycompany.exemplovacinacao.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A VacinacaoPessoa.
 */
@Entity
@Table(name = "vacinacao_pessoa")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class VacinacaoPessoa implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quando")
    private LocalDate quando;

    @Column(name = "cns")
    private String cns;

    @ManyToOne
    @JsonIgnoreProperties(value = "vacinacaoPessoas", allowSetters = true)
    private Pessoa pessoa;

    @ManyToOne
    @JsonIgnoreProperties(value = "vacinacaoPessoas", allowSetters = true)
    private Vacina vacina;

    @ManyToOne
    @JsonIgnoreProperties(value = "vacinacaoPessoas", allowSetters = true)
    private Fabricante vacina;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getQuando() {
        return quando;
    }

    public VacinacaoPessoa quando(LocalDate quando) {
        this.quando = quando;
        return this;
    }

    public void setQuando(LocalDate quando) {
        this.quando = quando;
    }

    public String getCns() {
        return cns;
    }

    public VacinacaoPessoa cns(String cns) {
        this.cns = cns;
        return this;
    }

    public void setCns(String cns) {
        this.cns = cns;
    }

    public Pessoa getPessoa() {
        return pessoa;
    }

    public VacinacaoPessoa pessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
        return this;
    }

    public void setPessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
    }

    public Vacina getVacina() {
        return vacina;
    }

    public VacinacaoPessoa vacina(Vacina vacina) {
        this.vacina = vacina;
        return this;
    }

    public void setVacina(Vacina vacina) {
        this.vacina = vacina;
    }

    public Fabricante getVacina() {
        return vacina;
    }

    public VacinacaoPessoa vacina(Fabricante fabricante) {
        this.vacina = fabricante;
        return this;
    }

    public void setVacina(Fabricante fabricante) {
        this.vacina = fabricante;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof VacinacaoPessoa)) {
            return false;
        }
        return id != null && id.equals(((VacinacaoPessoa) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "VacinacaoPessoa{" +
            "id=" + getId() +
            ", quando='" + getQuando() + "'" +
            ", cns='" + getCns() + "'" +
            "}";
    }
}
