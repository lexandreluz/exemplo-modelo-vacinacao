package com.mycompany.exemplovacinacao;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {
        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("com.mycompany.exemplovacinacao");

        noClasses()
            .that()
            .resideInAnyPackage("com.mycompany.exemplovacinacao.service..")
            .or()
            .resideInAnyPackage("com.mycompany.exemplovacinacao.repository..")
            .should()
            .dependOnClassesThat()
            .resideInAnyPackage("..com.mycompany.exemplovacinacao.web..")
            .because("Services and repositories should not depend on web layer")
            .check(importedClasses);
    }
}
