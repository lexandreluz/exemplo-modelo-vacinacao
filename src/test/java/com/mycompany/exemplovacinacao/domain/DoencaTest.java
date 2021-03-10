package com.mycompany.exemplovacinacao.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.exemplovacinacao.web.rest.TestUtil;

public class DoencaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Doenca.class);
        Doenca doenca1 = new Doenca();
        doenca1.setId(1L);
        Doenca doenca2 = new Doenca();
        doenca2.setId(doenca1.getId());
        assertThat(doenca1).isEqualTo(doenca2);
        doenca2.setId(2L);
        assertThat(doenca1).isNotEqualTo(doenca2);
        doenca1.setId(null);
        assertThat(doenca1).isNotEqualTo(doenca2);
    }
}
