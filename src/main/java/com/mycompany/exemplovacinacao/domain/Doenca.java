package com.mycompany.exemplovacinacao.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.ZonedDateTime;

/**
 * A Doenca.
 */
@Entity
@Table(name = "doenca")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Doenca implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "criado")
    private ZonedDateTime criado;

    @Column(name = "data_primeiro_caso")
    private LocalDate dataPrimeiroCaso;

    @Column(name = "local_primeiro_caso")
    private LocalDate localPrimeiroCaso;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Doenca nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public ZonedDateTime getCriado() {
        return criado;
    }

    public Doenca criado(ZonedDateTime criado) {
        this.criado = criado;
        return this;
    }

    public void setCriado(ZonedDateTime criado) {
        this.criado = criado;
    }

    public LocalDate getDataPrimeiroCaso() {
        return dataPrimeiroCaso;
    }

    public Doenca dataPrimeiroCaso(LocalDate dataPrimeiroCaso) {
        this.dataPrimeiroCaso = dataPrimeiroCaso;
        return this;
    }

    public void setDataPrimeiroCaso(LocalDate dataPrimeiroCaso) {
        this.dataPrimeiroCaso = dataPrimeiroCaso;
    }

    public LocalDate getLocalPrimeiroCaso() {
        return localPrimeiroCaso;
    }

    public Doenca localPrimeiroCaso(LocalDate localPrimeiroCaso) {
        this.localPrimeiroCaso = localPrimeiroCaso;
        return this;
    }

    public void setLocalPrimeiroCaso(LocalDate localPrimeiroCaso) {
        this.localPrimeiroCaso = localPrimeiroCaso;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Doenca)) {
            return false;
        }
        return id != null && id.equals(((Doenca) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Doenca{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", criado='" + getCriado() + "'" +
            ", dataPrimeiroCaso='" + getDataPrimeiroCaso() + "'" +
            ", localPrimeiroCaso='" + getLocalPrimeiroCaso() + "'" +
            "}";
    }
}
