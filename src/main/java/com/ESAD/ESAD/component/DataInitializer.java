package com.ESAD.ESAD.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Component;
import javax.annotation.PostConstruct;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@DependsOn({"rolesInitializer", "permissionInitializer", "rolePermissionLinkInitializer",
        "userInitializer", "enfermedadInitializer", "profesionItializer", "salidaInitializer", "tareaInitializer"})
public class DataInitializer {

    @Autowired
    private DataSource dataSource;

    @PostConstruct
    public void initData() {
        try (Connection connection = dataSource.getConnection();
             Statement statement = connection.createStatement()) {


            //-----------------------------------------------------
            // Inicialización esad_CS
            String[] columnNamesCS  = {"cs", "calle", "telefono"};

            String[][] dataCS  = {
                    {"Sancho", "Calle Ejemplo", "+12345678901"},
                    {"Brunete", "Calle Ejemplo 2", "+12345678902"},
                    {"Los Angeles", "Calle Ejemplo 3", "+12345678903"}
            };

            for (String[] rowData : dataCS ) {
                StringBuilder insertSqlBuilder = new StringBuilder("INSERT INTO ESAD_CS (");
                for (int i = 0; i < columnNamesCS .length; i++) {
                    insertSqlBuilder.append(columnNamesCS [i]);
                    if (i < columnNamesCS .length - 1) {
                        insertSqlBuilder.append(", ");
                    } else {
                        insertSqlBuilder.append(") VALUES (");
                    }
                }
                for (int i = 0; i < rowData.length; i++) {
                    insertSqlBuilder.append("'").append(rowData[i]).append("'");
                    if (i < rowData.length - 1) {
                        insertSqlBuilder.append(", ");
                    } else {
                        insertSqlBuilder.append(")");
                    }
                }

                statement.addBatch(insertSqlBuilder.toString());
            }

            statement.executeBatch();

            //-----------------------------------------------------
            // Inicialización esad_profesionales
            String[] columnNamesProfesionales = {"account_no_expired", "account_no_locked", "credential_no_expired", "is_enabled", "cualificacion", "dni", "email", "nombre", "password", "primer_apellido", "segundo_apellido", "telefono"};
            String[][] dataProfesionales = {
                    {"1", "1", "1", "1", "'3'", "'12345678Z'", "'profesional@example.com'", "'Luisa'", "'$2a$10$.btaTOC/PwcWbgTKvriyZ.Lk1E2unBU9VBEC7T59w2DLq1ugehCve'", "'Sánchez'", "'Rodríguez'", "12345678"},

                    {"1", "1", "1", "1", "'1'", "'87654321X'", "'tecnicosistemas@example.com'", "'Roberto'", "'$2a$10$.btaTOC/PwcWbgTKvriyZ.Lk1E2unBU9VBEC7T59w2DLq1ugehCve'", "'Jiménez'", "'Morales'", "12345678"},
                    {"1", "1", "1", "1", "'1'", "'23456789Y'", "'ingindustrial@example.net'", "'Marta'", "'$2a$10$.btaTOC/PwcWbgTKvriyZ.Lk1E2unBU9VBEC7T59w2DLq1ugehCve'", "'Luna'", "'Solís'", "12345678"},
                    {"1", "1", "1", "1", "'2'", "'34567890F'", "'disgrafico@example.org'", "'Carlos'", "'$2a$10$.btaTOC/PwcWbgTKvriyZ.Lk1E2unBU9VBEC7T59w2DLq1ugehCve'", "'Navarro'", "'Prieto'", "12345678"},
                    {"1", "1", "1", "1", "'2'", "'45678901G'", "'analistadatos@example.com'", "'Julia'", "'$2a$10$.btaTOC/PwcWbgTKvriyZ.Lk1E2unBU9VBEC7T59w2DLq1ugehCve'", "'Vega'", "'Mendoza'", "12345678"},
                    {"1", "1", "1", "1", "'4'", "'56789012H'", "'marketingspec@example.com'", "'Fernando'", "'$2a$10$.btaTOC/PwcWbgTKvriyZ.Lk1E2unBU9VBEC7T59w2DLq1ugehCve'", "'Rojas'", "'Campos'", "12345678"}


            };

            for (String[] rowData : dataProfesionales) {
                StringBuilder insertSqlBuilder = new StringBuilder("INSERT INTO esad_profesionales (");
                for (int i = 0; i < columnNamesProfesionales.length; i++) {
                    insertSqlBuilder.append(columnNamesProfesionales[i]);
                    if (i < columnNamesProfesionales.length - 1) {
                        insertSqlBuilder.append(", ");
                    } else {
                        insertSqlBuilder.append(") VALUES (");
                    }
                }
                for (int i = 0; i < rowData.length; i++) {
                    insertSqlBuilder.append(rowData[i]);
                    if (i < rowData.length - 1) {
                        insertSqlBuilder.append(", ");
                    } else {
                        insertSqlBuilder.append(")");
                    }
                }

                statement.addBatch(insertSqlBuilder.toString());
            }

            statement.executeBatch();

            //-----------------------------------------------------
            // Inicialización user_roles_union
            String[] columnNamesRolesUnion = {"user_id", "role_id"};
            String[][] dataRolesUnion = {
                    {"2", "2"},
                    {"2", "3"},
                    {"3", "3"},
                    {"4", "3"},
                    {"5", "3"},
                    {"6", "3"},
                    {"7", "4"}
            };

            for (String[] rowData : dataRolesUnion) {
                StringBuilder insertSqlBuilder = new StringBuilder("INSERT INTO user_roles_union (");
                for (int i = 0; i < columnNamesRolesUnion.length; i++) {
                    insertSqlBuilder.append(columnNamesRolesUnion[i]);
                    if (i < columnNamesRolesUnion.length - 1) {
                        insertSqlBuilder.append(", ");
                    } else {
                        insertSqlBuilder.append(") VALUES (");
                    }
                }
                for (int i = 0; i < rowData.length; i++) {
                    insertSqlBuilder.append(rowData[i]);
                    if (i < rowData.length - 1) {
                        insertSqlBuilder.append(", ");
                    } else {
                        insertSqlBuilder.append(")");
                    }
                }

                statement.addBatch(insertSqlBuilder.toString());
            }

            statement.executeBatch();

            //-----------------------------------------------------
            // Inicialización esad_equipo

            String[] columnEquipo2 = {"equipo" , "centro_id", "medico_id", "enfermero_id", "auxiliar_id","administrativo_id"};
            String[][] dataEquipo2 = {

                    {"Roberto", "1", "3", "5", "2", "7"},
                    {"Marta", "1", "4", "6", "2", "7"}
            };

            for (String[] rowData : dataEquipo2) {
                StringBuilder insertSqlBuilder = new StringBuilder("INSERT INTO ESAD_equipo (");
                for (int i = 0; i < columnEquipo2.length; i++) {
                    insertSqlBuilder.append(columnEquipo2[i]);
                    if (i < columnEquipo2.length - 1) {
                        insertSqlBuilder.append(", ");
                    } else {
                        insertSqlBuilder.append(") VALUES (");
                    }
                }
                for (int i = 0; i < rowData.length; i++) {
                    insertSqlBuilder.append("'");
                    insertSqlBuilder.append(rowData[i].replace("'", "''")); // Escapar comillas simples
                    insertSqlBuilder.append("'");
                    if (i < rowData.length - 1) {
                        insertSqlBuilder.append(", ");
                    } else {
                        insertSqlBuilder.append(")");
                    }
                }

                statement.addBatch(insertSqlBuilder.toString());
            }

            statement.executeBatch();

            //-----------------------------------------------------
            // Inicialización esad_usuarios


            String[] columnPacientes = {
                    "centro_salud_id", "edad", "en_programa", "enfermedad_id", "equipo_id",
                    "fecha_ingreso", "fecha_nacimiento", "historico", "lugar_fecha", "residencia",
                    "supera_50", "supera_70", "supera_90", "tipo_salida_id", "direccion_residencia",
                    "dni", "lugar_salida", "nombre", "primer_apellido", "segundo_apellido",
                    "telefono_residencia"
            };


            String[][] dataPaciente = {

                    {"1", "71", "true", "2", "1",
                            "2024-04-25", "1982-07-16", "false", "2024-06-2", "true",
                            "false", "true", "false", "1", "Calle Ficticia 123",
                            "0011223D", "Hospital", "Sandra", "Garcia", "Lopez",
                            "555-1234"},

                    {"2", "51", "true", "3", "1",
                            "2024-04-25", "1982-07-16", "false", "2024-06-2", "true",
                            "true", "false", "false", "null", "Calle Ficticia 123",
                            "0011223D", "null", "Frodo", "Baggins", "Brandyroot",
                            "555-1234"},

                    {"2", "61", "true", "1", "1",
                            "2024-04-25", "1982-07-16", "false", "2024-06-2", "false",
                            "true", "false", "false", "null", "Calle Ficticia 123",
                            "0011223D", "null", "Samwise", "Gamgee", "Longfoot",
                            "555-1234"},

                    {"1", "91", "true", "5", "2",
                            "2024-04-25", "1982-07-16", "false", "2024-06-2", "false",
                            "false", "false", "true", "1", "Calle Ficticia 123",
                            "0011223D", "Hospital", "Gandalf", "Grey", "Pilgrim",
                            "555-1234"},

                    {"3", "81", "true", "2", "2",
                            "2024-04-25", "1982-07-16", "false", "2024-06-2", "false",
                            "false", "true", "false", "2", "Calle Ficticia 123",
                            "0011223D", "Hospital", "Aragorn", "Elessar", "Telcontar",
                            "555-1234"},

                    {"3", "54", "true", "2", "2",
                            "2024-04-25", "1982-07-16", "false", "2024-06-2", "false",
                            "true", "false", "false", "2", "Calle Ficticia 123",
                            "0011223D", "Hospital", "Legolas", "Greenleaf", "Woodwalker",
                            "555-1234"},

                    {"1", "98", "true", "2", "1",
                            "2024-04-25", "1982-07-16", "false", "2024-06-2", "false",
                            "false", "false", "true", "1", "Calle Ficticia 123",
                            "0011223D", "Hospital", "Gimli", "Gloinson", "Hammerhand",
                            "555-1234"},

                    {"3", "40", "true", "5", "1",
                            "2024-04-25", "1982-07-16", "false", "2024-06-2", "false",
                            "false", "false", "false", "1", "Calle Ficticia 123",
                            "0011223D", "Hospital", "Boromir", "Gondorian", "Shieldbearer",
                            "555-1234"},

                    {"2", "65", "true", "5", "2",
                            "2024-04-25", "1982-07-16", "true", "2024-06-2", "false",
                            "false", "true", "false", "1", "Calle Ficticia 123",
                            "0011223D", "Residencia", "Merry", "Brandybuck", "Appledore",
                            "555-1234"},

                    {"1", "71", "true", "7", "1",
                            "2024-04-25", "1982-07-16", "true", "2024-06-2", "false",
                            "false", "true", "false", "1", "Calle Ficticia 123",
                            "0011223D", "Hospital", "Pippin", "Took", "Whitfoot",
                            "555-1234"},

                    {"1", "71", "true", "2", "1",
                            "2024-04-25", "1982-07-16", "false", "2024-06-2", "true",
                            "false", "true", "false", "1", "Calle Ficticia 123",
                            "0011223D", "Casa", "Arwen", "Undomiel", "Starflower",
                            "555-1234"},

                    {"2", "51", "true", "3", "1",
                            "2024-04-25", "1982-07-16", "false", "2024-06-2", "true",
                            "true", "false", "false", "null", "Calle Ficticia 123",
                            "0011223D", "null", "Éowyn", "Rohirrim", "Shieldmaiden",
                            "555-1234"},

                    {"2", "61", "true", "1", "1",
                            "2024-04-25", "1982-07-16", "false", "2024-06-2", "false",
                            "true", "false", "false", "null", "Calle Ficticia 123",
                            "0011223D", "null", "Faramir", "Gondorian", "Eagleeye",
                            "555-1234"},

                    {"1", "91", "true", "5", "2",
                            "2024-04-25", "1982-07-16", "false", "2024-06-2", "false",
                            "false", "false", "true", "1", "Calle Ficticia 123",
                            "0011223D", "Hospital", "Galadriel", "Lorien", "Starweaver",
                            "555-1234"},

                    {"3", "81", "true", "2", "2",
                            "2024-04-25", "1982-07-16", "false", "2024-06-2", "false",
                            "false", "true", "false", "2", "Calle Ficticia 123",
                            "0011223D", "Hospital", "Elrond", "Halfelven", "Wisemind",
                            "555-1234"},

                    {"3", "54", "true", "2", "2",
                            "2024-04-25", "1982-07-16", "false", "2024-06-2", "false",
                            "true", "false", "false", "2", "Calle Ficticia 123",
                            "0011223D", "Hospital", "Bilbo", "Baggins", "Tooksfreind",
                            "555-1234"},

                    {"1", "98", "true", "2", "1",
                            "2024-04-25", "1982-07-16", "false", "2024-06-2", "false",
                            "false", "false", "true", "1", "Calle Ficticia 123",
                            "0011223D", "Hospital", "Gollum", "Riverfolk", "Lost",
                            "555-1234"},

                    {"3", "40", "true", "5", "1",
                            "2024-04-25", "1982-07-16", "false", "2024-06-2", "false",
                            "false", "false", "false", "1", "Calle Ficticia 123",
                            "0011223D", "Hospital", "Théoden", "King", "Horseguard",
                            "555-1234"},

                    {"2", "65", "true", "5", "2",
                            "2024-04-25", "1982-07-16", "true", "2024-06-2", "false",
                            "false", "true", "false", "1", "Calle Ficticia 123",
                            "0011223D", "Hospital", "Denethor", "Steward", "Firegazer",
                            "555-1234"},

                    {"1", "71", "true", "7", "1",
                            "2024-04-25", "1982-07-16", "true", "2024-06-2", "false",
                            "false", "true", "false", "1", "Calle Ficticia 123",
                            "0011223D", "Hospital", "Treebeard", "Forest", "Ancient",
                            "555-1234"},
            };

            for (String[] rowData : dataPaciente) {
                StringBuilder insertSqlBuilder = new StringBuilder("INSERT INTO ESAD_usuarios (");
                insertSqlBuilder.append(String.join(", ", columnPacientes));
                insertSqlBuilder.append(") VALUES (");

                for (int i = 0; i < rowData.length; i++) {
                    String value = rowData[i];
                    // Determinar si el valor debe ir entre comillas basándose en el tipo de dato esperado
                    boolean isStringType = columnPacientes[i].equals("fecha_ingreso") ||
                            columnPacientes[i].equals("fecha_nacimiento") ||
                            columnPacientes[i].equals("direccion_residencia") ||
                            columnPacientes[i].equals("dni") ||
                            columnPacientes[i].equals("lugar_salida") ||
                            columnPacientes[i].equals("nombre") ||
                            columnPacientes[i].equals("primer_apellido") ||
                            columnPacientes[i].equals("segundo_apellido") ||
                            columnPacientes[i].equals("telefono_residencia") ||
                            columnPacientes[i].equals("lugar_fecha");
                    if (value != null) {
                    if (isStringType) {
                        // Añadir comillas para los valores de tipo String y Date
                        insertSqlBuilder.append("'").append(value).append("'");
                    } else {
                        // No añadir comillas para tipos Boolean, Integer, y otros no-String
                        insertSqlBuilder.append(value);
                    }  } else {
                        // Si el valor es null, añadir NULL sin comillas
                        insertSqlBuilder.append("NULL");
                    }

                    if (i < rowData.length - 1) {
                        insertSqlBuilder.append(", ");
                    }

                }

                insertSqlBuilder.append(");");
                statement.addBatch(insertSqlBuilder.toString());
            }

            statement.executeBatch();

            String[] columnTareas = {"fecha", "tipo_tarea_id", "usuario_id"};
            String[][] dataTareas = {

                    {"2024-04-25", "1", "3"},
                    {"2024-04-26", "2", "3"},
                    {"2024-04-25", "1", "4"},
                    {"2024-04-26", "3", "5"},
                    {"2024-04-26", "1", "5"}
            };

            for (String[] rowData : dataTareas) {
                StringBuilder insertSqlBuilder = new StringBuilder("INSERT INTO ESAD_tareas (");
                for (int i = 0; i < columnTareas.length; i++) {
                    insertSqlBuilder.append(columnTareas[i]);
                    if (i < columnTareas.length - 1) {
                        insertSqlBuilder.append(", ");
                    } else {
                        insertSqlBuilder.append(") VALUES (");
                    }
                }
                for (int i = 0; i < rowData.length; i++) {
                    if (i == 0) {
                        insertSqlBuilder.append("'");
                    }
                    insertSqlBuilder.append(rowData[i]);
                    if (i == 0) {
                        insertSqlBuilder.append("'");
                    }
                    if (i < rowData.length - 1) {
                        insertSqlBuilder.append(", ");
                    } else {
                        insertSqlBuilder.append(")");
                    }
                }

                statement.addBatch(insertSqlBuilder.toString());
            }

            statement.executeBatch();



        } catch (Exception e) {
            System.out.println("Error ejecutando batch: " + e.getMessage());

            e.printStackTrace();
        }
    }
}