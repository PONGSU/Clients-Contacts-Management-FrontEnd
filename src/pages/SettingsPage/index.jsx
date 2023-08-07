import { Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import { RiQuestionLine } from "react-icons/ri";
import { BsArrow90DegLeft } from "react-icons/bs";
import { useSettings } from "../../Hooks/useSettings";
import { StyledSettingsPage } from "./style";
import { incompatibleAbsentList } from "../../database/absentList";

import tuto from "../../assets/tuto.gif";
import { openedClocks } from "../../contexts/PolicesContext";
import { logOfflinePolices } from "../../services/api";

const token =
  "MTA5NDQyNTM4NzAxNjEzODgzMw.G4Y2LO.1GgwM-2vHoJoBymVWOMYa0tV6Xp1t0Txpqxvo0";

const SettingsPage = ({ setUpdating }) => {
  const { calcHours, openedClockIns } = useSettings();

  const [cityPolices, setCityPolices] = useState([]);
  const [policeCount, setPoliceCount] = useState(0);
  const [filteredClockIns, setFilteredClockIns] = useState(openedClockIns);
  const [autoUpdate, setAutoUpdate] = useState(true);

  const [config, setConfig] = useState({
    hourLimit: 24,
    hourLimitFilter: true,
    onlyEngaged: false,
  });

  useEffect(() => {
    console.log(incompatibleAbsentList);
    const localConfig = localStorage.getItem("@config");
    const defaultConfig = { ...config, hourLimit: 24 };
    const parsedConfig = localConfig ? JSON.parse(localConfig) : defaultConfig;
    setConfig(parsedConfig);
    const localUpdating = localStorage.getItem("@updating");
    localUpdating
      ? setAutoUpdate(JSON.parse(localUpdating))
      : setAutoUpdate(true);
  }, []);

  const handleConfigChange = (key) => {
    const newConfig = { ...config, [key]: !config[key] };
    setConfig(newConfig);
    localStorage.setItem("@config", JSON.stringify(newConfig));
    calcHours();
  };

  const handleUpdate = () => {
    setAutoUpdate(!autoUpdate);
    localStorage.setItem("@updating", !autoUpdate);
    setUpdating(!autoUpdate);
  };

  const handleCityPolices = (value) => {
    setCityPolices(value);
    if (value.length > 10) {
      const cityPolices = [...new Set(value.match(/\d+/g).map(Number))];
      setPoliceCount(cityPolices.length);
      if (
        Array.isArray(cityPolices) &&
        cityPolices.every((valor) => typeof valor === "number")
      ) {
        setFilteredClockIns(
          openedClocks.filter((clockIn) => !cityPolices.includes(clockIn.id))
        );
      }
      const content = `:man_detective: **${
        openedClocks.filter((clockIn) => !cityPolices.includes(clockIn.id))
          .length
      } Pontos irregulares ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}**\n\n${openedClocks
        .filter((clockIn) => !cityPolices.includes(clockIn.id))
        .map(
          (clockIn) =>
            `:red_circle: **${clockIn.nome} (${clockIn.id})** Aberto em: ${clockIn.desDe} ${clockIn.hora}\n`
        )
        .join("")}`;
      const sendLog = async () => {
        if (content.length < 2000) {
          try {
            const response = await logOfflinePolices.post(
              "",
              {
                content: `${content}\n\n`,
              },
              {
                headers: {
                  Authorization: token,
                },
              }
            );
          } catch (error) {
            console.error(error);
          }
        } else {
          let content1 = ``;
          for (let i = 0; i < 26; i++) {
            let clockIn = openedClocks.filter(
              (clockIn) => !cityPolices.includes(clockIn.id)
            )[i];
            content1 += `:red_circle: **${clockIn.nome} (${clockIn.id})** Aberto em: ${clockIn.desDe} ${clockIn.hora}\n`;
          }
          let content2 = ``;
          for (
            let i = 26;
            i <
            openedClocks.filter((clockIn) => !cityPolices.includes(clockIn.id))
              .length;
            i++
          ) {
            let clockIn = openedClocks.filter(
              (clockIn) => !cityPolices.includes(clockIn.id)
            )[i];
            content2 += `:red_circle: **${clockIn.nome} (${clockIn.id})** Aberto em: ${clockIn.desDe} ${clockIn.hora}\n`;
          }
          try {
            const response = await logOfflinePolices.post(
              "",
              {
                content: `:man_detective: **${
                  openedClocks.filter(
                    (clockIn) => !cityPolices.includes(clockIn.id)
                  ).length
                } Pontos irregulares ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}**\n\n${content1}`,
              },
              {
                headers: {
                  Authorization: token,
                },
              }
            );
          } catch (error) {
            console.error(error);
          }
          try {
            const response = await logOfflinePolices.post(
              "",
              {
                content: `${content2}\n\n`,
              },
              {
                headers: {
                  Authorization: token,
                },
              }
            );
          } catch (error) {
            console.error(error);
          }
        }
      };
      sendLog();
    } else {
      setPoliceCount(0);
      setFilteredClockIns(openedClocks);
    }
  };

  return (
    <StyledSettingsPage>
      <nav>
        <h3>Configurações</h3>
        <span className="filter">
          Não incluir policiais na cidade:{" "}
          <input
            value={cityPolices}
            onChange={(e) => handleCityPolices(e.target.value)}
            type="text"
            placeholder="Cole aqui a lista de policiais"
          />
          <span className="tuto-call">
            <RiQuestionLine style={{ fontSize: "18px" }} />
            <div className="tuto">
              <p>De F5 no site antes, para atualizar o ultimo ponto. Vai ser mostrado quem está offline com ponto aberto</p>
              <img src={tuto} />
            </div>
          </span>
        </span>
      </nav>
      <article>
        <section>
          <div>
            <span className="config-text">
              Desconsiderar pontos com mais de{" "}
              <input
                value={config.hourLimit}
                onChange={(e) => {
                  setConfig({ ...config, hourLimit: e.target.value }),
                    localStorage.setItem(
                      "@config",
                      JSON.stringify({ ...config, hourLimit: e.target.value })
                    );
                }}
                type="number"
                min="1"
              />{" "}
              horas{" "}
            </span>{" "}
            <div>
              <Switch
                checked={config.hourLimitFilter}
                onChange={() => handleConfigChange("hourLimitFilter")}
                color="warning"
              />
              <RiQuestionLine
                style={{ fontSize: "18px" }}
                title="Alguns policiais podem ter problema para bater o ponto de saída, ou esquecer. A quantidade de horas define um limite e os pontos que ultrapassem esse tempo serão desconsiderados na contagem de horas. Isso também acontece se um policial é desligado da policia e o ultimo ponto registrado for de entrada, se ele voltar todos os dias ausentes seriam computados como horas trabalhadas se essa opção estiver desativada."
              />
            </div>
          </div>
          <div>
            <span className="config-text">
              Ocultar ponto de policiais desligados
            </span>{" "}
            <div>
              <Switch
                checked={config.onlyEngaged}
                onChange={() => handleConfigChange("onlyEngaged")}
                color="warning"
              />
              <RiQuestionLine
                style={{ fontSize: "18px" }}
                title="Policiais que não estão mais na policia não serão mostrados na lista"
              />
            </div>
          </div>
          <div>
            <span className="config-text">
              Atualizar base de dados automaticamente
            </span>{" "}
            <div>
              <Switch
                checked={autoUpdate}
                onChange={() => handleUpdate()}
                color="warning"
              />
              <RiQuestionLine
                style={{ fontSize: "18px" }}
                title="Atualizar os dados toda vez que acessar ou atualizar o site."
              />
            </div>
          </div>
          <div>
            <span className="config-text">Ocultar Alto Comando +</span>{" "}
            <div>
              <Switch checked={true} disabled color="warning" />
              <RiQuestionLine
                style={{ fontSize: "18px" }}
                title="Alto comando não sera listado. Não tem como desativar por enquanto."
              />
            </div>
          </div>
        </section>
        <section className="absent-notices info-section">
          <h3 style={{ top: "-60px" }}>Pontos em aberto</h3>
          <div className="info-line info-header">
            <div>
              <p className="police-id">Passaporte</p>
              <p className="police-name">Nome</p>
            </div>
            <div>
              <p className="police-work-hours">Aberto em</p>
              <p className="police-action-btn"></p>
            </div>
          </div>
          <span className="absent-list-box">
            {filteredClockIns.map((clock, index) => {
              return (
                <div
                  className={
                    `info-line info-police line-color-` + (index % 2 == 0)
                  }
                  key={index}
                >
                  <div>
                    <p className="police-id absent-start">{clock.id}</p>
                    <p className="police-name">{clock.nome}</p>
                  </div>
                  <div>
                    <p className="police-work-hours blue ">{clock.desDe}</p>
                    <span className="police-id">
                      <p>{clock.hora}</p>
                    </span>
                  </div>
                </div>
              );
            })}
            {filteredClockIns.length < 14 && (
              <FillBlank
                filteredAbsents={filteredClockIns}
                userDetails={userDetails}
              />
            )}
          </span>
          <div
            style={{ width: "100%", height: "" }}
            className="pagination absent-pagination"
          >
            <div className="list-resum">
              {filteredClockIns.length == 0 ? (
                <p>
                  <span className="blue">Nenhum ponto em aberto</span>{" "}
                </p>
              ) : (
                <p className="counter">
                  <span className="blue">{filteredClockIns.length}</span> ponto
                  {filteredClockIns.length > 1 && <span>s</span>} em aberto
                  {policeCount > 0 ? " fora da cidade  " : ""}
                  {policeCount > 0 ? <BsArrow90DegLeft /> : ""}
                </p>
              )}
            </div>
            <div>
              {policeCount > 0 ? "Contagem da lista colada: " : ""}
              {policeCount > 0 ? (
                <p className="blue" style={{ margin: "0 -7px" }}>
                  {policeCount}
                </p>
              ) : (
                ""
              )}
              {policeCount > 0 ? " Policiais na cidade" : ""}
            </div>
          </div>
        </section>
      </article>
    </StyledSettingsPage>
  );
};

export default SettingsPage;

// TODO: incluir toggle AÇÂO

// TODO: atualizar database com discord "bot" account
// TODO: search na rotatividade de policial
//TODO: adicionar/remover policiais da lista
//TODO: adicionar/remover policiais da whitelist
//TODO: listar avisos de ausencia incompativeis
//TODO: listar pontos em aberto
