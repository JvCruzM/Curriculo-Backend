import "dotenv/config";

import sequelize from "../src/config/database.js";
import {
  Profile,
  AcademicExperience,
  ProfessionalExperience,
  Project,
  Technology,
} from "../src/models/index.js";

const profilesData = [
  {
    name: "João Vitor Cruz de Menezes",
    email: "cruzdemenezesjv@gmail.com",
    phone: "(81) 99226-3691",
    location: "Recife-PE",
    summary:
      "Profissional com experiência nas áreas de logística e administração, atualmente direcionando sua formação para Tecnologia da Informação, com foco no desenvolvimento de sistemas e soluções digitais.",
    photoUrl: "https://avatars.githubusercontent.com/u/206948909?v=4",
    githubUrl: "https://github.com/JvCruzM",
    linkedinUrl: "https://www.linkedin.com/in/jvcruzm/?isSelfProfile=true",

    academicExperiences: [
      {
        institution: "ETE Professor Lucilo Ávila Pessoa",
        course: "Redes de Computadores",
        degree: "Técnico",
        startDate: "2020-02-01",
        endDate: "2022-12-01",
        description:
          "Curso médio/técnico voltado para Redes de Computadores.",
      },
      {
        institution: "Universidade Católica de Pernambuco (UNICAP)",
        course: "Sistemas para Internet",
        degree: "Tecnólogo",
        startDate: "2025-04-01",
        endDate: null,
        description:
          "Curso de ensino superior voltado para a criação de sistemas para plataformas digitais.",
      },
    ],

    professionalExperiences: [
      {
        company: "TRA Distribuidora",
        position: "Auxiliar de Logística",
        startDate: "2023-05-01",
        endDate: "2025-09-01",
        description:
          "Atuação como auxiliar de logística em uma distribuidora de produtos do meio pet.",
      },
      {
        company: "FICR",
        position: "Aprendiz de Rotina Administrativa",
        startDate: "2026-07-01",
        endDate: null,
        description:
          "Atuação como profissional na área administrativa voltado ao relacionamento com o aluno da instituição de ensino.",
      },
    ],

    projects: [
      {
        name: "Amigo ou Inimigo",
        description:
          "Site para realização de sorteios de amigo/inimigo secreto para confraternizações.",
        githubUrl: "https://github.com/JvCruzM/Amigo-ou-Inimigo",
        projectUrl: "https://amigo-ou-inimigo.vercel.app/",
        startDate: "2026-08-01",
        endDate: "2026-09-01",
        technologies: [
          "Next.js",
          "React",
          "Tailwind CSS",
          "Prisma",
          "Supabase",
          "Nodemailer",
          "bcrypt",
        ],
      },
      {
        name: "YouSeen",
        description:
          "Extensão para Vivaldi/Chromium que oculta vídeos já assistidos dentro de canais do YouTube.",
        githubUrl: "https://github.com/JvCruzM/YouSeen",
        projectUrl: "https://github.com/JvCruzM/YouSeen",
        startDate: "2026-09-01",
        endDate: "2026-09-01",
        technologies: [
          "JavaScript",
          "HTML",
          "CSS",
          "Chrome Extensions API",
          "Manifest V3",
        ],
      },
    ],
  },

  {
    name: "Lucas Henrique Almeida",
    email: "lucas.almeida.curriculo@example.com",
    phone: "(81) 98888-1122",
    location: "Recife-PE",
    summary:
      "Desenvolvedor em formação com interesse em desenvolvimento web, APIs REST e bancos de dados relacionais, buscando aprimorar conhecimentos por meio de projetos acadêmicos e pessoais.",
    photoUrl: "https://i.pravatar.cc/300?img=12",
    githubUrl: "https://github.com/lucas-henrique-almeida",
    linkedinUrl: "https://www.linkedin.com/in/lucas-henrique-almeida",

    academicExperiences: [
      {
        institution: "Escola Técnica Estadual de Pernambuco",
        course: "Desenvolvimento de Sistemas",
        degree: "Técnico",
        startDate: "2021-02-01",
        endDate: "2023-12-01",
        description:
          "Formação técnica com foco em programação, bancos de dados e desenvolvimento de aplicações.",
      },
      {
        institution: "Universidade Federal de Pernambuco (UFPE)",
        course: "Ciência da Computação",
        degree: "Bacharelado",
        startDate: "2024-02-01",
        endDate: null,
        description:
          "Graduação com foco em fundamentos da computação, engenharia de software e desenvolvimento de sistemas.",
      },
    ],

    professionalExperiences: [
      {
        company: "TechLab Solutions",
        position: "Estagiário de Desenvolvimento",
        startDate: "2024-08-01",
        endDate: "2025-08-01",
        description:
          "Participação no desenvolvimento e manutenção de aplicações web e APIs internas.",
      },
      {
        company: "Nexa Sistemas",
        position: "Desenvolvedor Júnior",
        startDate: "2025-09-01",
        endDate: null,
        description:
          "Atuação no desenvolvimento de aplicações web, integração de APIs e manutenção de bancos de dados relacionais.",
      },
    ],

    projects: [
      {
        name: "TaskFlow",
        description:
          "Aplicação web para gerenciamento de tarefas e projetos utilizando autenticação e persistência de dados.",
        githubUrl: "https://github.com/lucas-henrique-almeida/taskflow",
        projectUrl: "https://taskflow-demo.vercel.app/",
        startDate: "2025-01-01",
        endDate: "2025-03-01",
        technologies: [
          "JavaScript",
          "Node.js",
          "Express",
          "PostgreSQL",
        ],
      },
      {
        name: "FinanceTrack",
        description:
          "Aplicação para acompanhamento de receitas, despesas e planejamento financeiro pessoal.",
        githubUrl: "https://github.com/lucas-henrique-almeida/financetrack",
        projectUrl: null,
        startDate: "2025-05-01",
        endDate: "2025-07-01",
        technologies: [
          "React",
          "Node.js",
          "Express",
          "PostgreSQL",
          "Docker",
        ],
      },
    ],
  },
];

const getOrCreateTechnology = async (name, transaction) => {
  const [technology] = await Technology.findOrCreate({
    where: { name },
    defaults: {
      name,
      category: null,
    },
    transaction,
  });

  return technology;
};

const seed = async () => {
  const transaction = await sequelize.transaction();

  try {
    for (const profileData of profilesData) {
      const {
        academicExperiences,
        professionalExperiences,
        projects,
        ...profileFields
      } = profileData;

      const [profile] = await Profile.findOrCreate({
        where: {
          email: profileFields.email,
        },
        defaults: profileFields,
        transaction,
      });

      await profile.update(profileFields, { transaction });

      for (const academicData of academicExperiences) {
        const existingAcademic = await AcademicExperience.findOne({
          where: {
            profileId: profile.id,
            institution: academicData.institution,
            course: academicData.course,
          },
          transaction,
        });

        if (existingAcademic) {
          await existingAcademic.update(academicData, { transaction });
        } else {
          await AcademicExperience.create(
            {
              ...academicData,
              profileId: profile.id,
            },
            { transaction },
          );
        }
      }

      for (const professionalData of professionalExperiences) {
        const existingProfessional = await ProfessionalExperience.findOne({
          where: {
            profileId: profile.id,
            company: professionalData.company,
            position: professionalData.position,
          },
          transaction,
        });

        if (existingProfessional) {
          await existingProfessional.update(professionalData, { transaction });
        } else {
          await ProfessionalExperience.create(
            {
              ...professionalData,
              profileId: profile.id,
            },
            { transaction },
          );
        }
      }

      for (const projectData of projects) {
        const { technologies, ...projectFields } = projectData;

        let project = await Project.findOne({
          where: {
            profileId: profile.id,
            name: projectFields.name,
          },
          transaction,
        });

        if (project) {
          await project.update(projectFields, { transaction });
        } else {
          project = await Project.create(
            {
              ...projectFields,
              profileId: profile.id,
            },
            { transaction },
          );
        }

        const projectTechnologies = [];

        for (const technologyName of technologies) {
          const technology = await getOrCreateTechnology(
            technologyName,
            transaction,
          );

          projectTechnologies.push(technology);
        }

        await project.setTechnologies(projectTechnologies, { transaction });
      }
    }

    await transaction.commit();

    console.log("Seed executado com sucesso.");
  } catch (error) {
    await transaction.rollback();

    console.error("Erro ao executar seed:", error);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
};

seed();