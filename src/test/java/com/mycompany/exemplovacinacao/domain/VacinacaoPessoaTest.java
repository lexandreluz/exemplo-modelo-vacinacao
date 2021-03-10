package com.mycompany.exemplovacinacao.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.exemplovacinacao.web.rest.TestUtil;

public class VacinacaoPessoaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(VacinacaoPessoa.class);
        VacinacaoPessoa vacinacaoPessoa1 = new VacinacaoPessoa();
        vacinacaoPessoa1.setId(1L);
        VacinacaoPessoa vacinacaoPessoa2 = new VacinacaoPessoa();
        vacinacaoPessoa2.setId(vacinacaoPessoa1.getId());
        assertThat(vacinacaoPessoa1).isEqualTo(vacinacaoPessoa2);
        vacinacaoPessoa2.setId(2L);
        assertThat(vacinacaoPessoa1).isNotEqualTo(vacinacaoPessoa2);
        vacinacaoPessoa1.setId(null);
        assertThat(vacinacaoPessoa1).isNotEqualTo(vacinacaoPessoa2);
    }
}
