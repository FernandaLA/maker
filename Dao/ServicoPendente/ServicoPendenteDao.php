<?php
include_once("Dao/Agenda/AgendaDao.php");
class ServicoPendenteDao extends AgendaDao
{

    Public Function ServicoPendenteDao() {
        $this->conect();
    }

    Public Function ListarServicoPendentePrestador($codUsuario) {
        $select = " SELECT A.COD_AGENDAMENTO,
                           A.COD_CLIENTE AS COD_USUARIO_REF,
                           CONCAT(U.NME_USUARIO, ' ', COALESCE(U.DSC_SOBRENOME, '')) AS NME_USUARIO_COMPLETO,
                        --    '4,8' AS NOTA_PRESTADOR,
                           U.DSC_CAMINHO_FOTO,
                           A.DSC_HORARIO,
                           A.DTA_AGENDAMENTO,
                           A.COD_SERVICO,
                           SP.COD_CATEGORIA,
                           CS.DSC_CATEGORIA,
                           SP.DSC_SERVICO,
                           SP.VLR_SERVICO
                      FROM EN_AGENDAMENTO A
                     INNER JOIN SE_USUARIO U
                        ON A.COD_CLIENTE = U.COD_USUARIO
                     INNER JOIN EN_SERVICO_PRESTADOR SP
                        ON A.COD_SERVICO = SP.COD_SERVICO_PRESTADOR
                     INNER JOIN EN_CATEGORIA_SERVICO CS
                        ON SP.COD_CATEGORIA = CS.COD_CATEGORIA
                     WHERE A.COD_STATUS = 1
                       AND A.COD_PRESTADOR =".$codUsuario;
        return $this->selectDB($select, false);
    }

    Public Function ListarServicoPendenteCliente($codUsuario) {
        $select = " SELECT A.COD_AGENDAMENTO,
                           A.COD_PRESTADOR AS COD_USUARIO_REF,
                           CONCAT(U.NME_USUARIO, ' ', COALESCE(U.DSC_SOBRENOME, '')) AS NME_USUARIO_COMPLETO,
                    --       '4,8' AS NOTA_PRESTADOR,
                           U.DSC_CAMINHO_FOTO,
                           A.DSC_HORARIO,
                           A.DTA_AGENDAMENTO,
                           A.COD_SERVICO,
                           SP.COD_CATEGORIA,
                           CS.DSC_CATEGORIA,
                           SP.DSC_SERVICO,
                           SP.VLR_SERVICO
                      FROM EN_AGENDAMENTO A
                     INNER JOIN SE_USUARIO U
                        ON A.COD_PRESTADOR = U.COD_USUARIO
                     INNER JOIN EN_SERVICO_PRESTADOR SP
                        ON A.COD_SERVICO = SP.COD_SERVICO_PRESTADOR
                     INNER JOIN EN_CATEGORIA_SERVICO CS
                        ON SP.COD_CATEGORIA = CS.COD_CATEGORIA
                     WHERE A.COD_STATUS = 1
                       AND COD_CLIENTE =".$codUsuario;
        return $this->selectDB($select, false);
    }
}