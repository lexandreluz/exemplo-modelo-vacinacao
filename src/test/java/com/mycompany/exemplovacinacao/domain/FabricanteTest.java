package com.mycompany.exemplovacinacao.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.exemplovacinacao.web.rest.TestUtil;

public class FabricanteTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Fabricante.class);
        Fabricante fabricante1 = new Fabricante();
        fabricante1.setId(1L);
        Fabricante fabricante2 = new Fabricante();
        fabricante2.setId(fabricante1.getId());
        assertThat(fabricante1).isEqualTo(fabricante2);
        fabricante2.setId(2L);
        assertThat(fabricante1).isNotEqualTo(fabricante2);
        fabricante1.setId(null);
        assertThat(fabricante1).isNotEqualTo(fabricante2);
    }
}
