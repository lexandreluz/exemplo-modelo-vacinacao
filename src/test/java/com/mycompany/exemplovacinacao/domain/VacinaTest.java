package com.mycompany.exemplovacinacao.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.exemplovacinacao.web.rest.TestUtil;

public class VacinaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Vacina.class);
        Vacina vacina1 = new Vacina();
        vacina1.setId(1L);
        Vacina vacina2 = new Vacina();
        vacina2.setId(vacina1.getId());
        assertThat(vacina1).isEqualTo(vacina2);
        vacina2.setId(2L);
        assertThat(vacina1).isNotEqualTo(vacina2);
        vacina1.setId(null);
        assertThat(vacina1).isNotEqualTo(vacina2);
    }
}
