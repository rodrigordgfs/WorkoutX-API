import { prisma } from "../src/libs/prisma.js";

async function main() {
  const workouts = [
    {
      userId: "user_2tYPPiwlmkzwFQftgQ49Y372EUM",
      name: "Treino A - Peito e Bíceps",
      visibility: "PRIVATE",
      exercises: [
        {
          name: "Supino Reto",
          series: "4",
          repetitions: "12",
          weight: "20",
          restTime: "60",
          videoUrl: "https://www.youtube.com/watch?v=EZMYCLKuGow",
          instructions:
            "Deite-se no banco reto com os pés firmes no chão e segure a barra com as mãos um pouco além da largura dos ombros. Retire a barra do suporte e desça-a de forma controlada até a linha do peitoral. Em seguida, empurre a barra para cima até estender completamente os braços. Mantenha a postura estável e respire corretamente durante o movimento.",
        },
        {
          name: "Supino Inclinado",
          series: "4",
          repetitions: "12",
          weight: "20",
          restTime: "60",
          videoUrl: "https://www.youtube.com/watch?v=WP1VLAt8hbM",
          instructions:
            "Sente-se no banco inclinado e segure a barra com as mãos um pouco além da largura dos ombros. Desça a barra controladamente até a parte superior do peitoral e depois empurre para cima até a extensão completa dos braços.",
        },
        {
          name: "Pullover",
          series: "4",
          repetitions: "12",
          weight: "15",
          restTime: "60",
          videoUrl: "https://www.youtube.com/watch?v=-KaMXMMIVrU",
          instructions:
            "Deite-se em um banco e segure um halter com ambas as mãos acima do peito. Leve o halter para trás da cabeça de forma controlada e retorne à posição inicial, mantendo os braços levemente flexionados.",
        },
        {
          name: "Crossover",
          series: "4",
          repetitions: "12",
          weight: "10",
          restTime: "60",
          videoUrl: "https://www.youtube.com/watch?v=jqTlJt3JXzQ",
          instructions:
            "Segure as manoplas do crossover na altura dos ombros, mantenha os braços levemente flexionados e traga as manoplas para frente, cruzando na frente do peito. Retorne lentamente à posição inicial.",
        },
        {
          name: "Rosca Direta com Barra",
          series: "4",
          repetitions: "12",
          weight: "15",
          restTime: "60",
          videoUrl: "https://www.youtube.com/watch?v=s4B8UW3BMqk",
          instructions:
            "Segure a barra com as mãos na largura dos ombros, mantendo os cotovelos fixos ao corpo. Flexione os cotovelos trazendo a barra até a altura do peito e depois retorne lentamente à posição inicial.",
        },
        {
          name: "Rosca Alternada com Halteres",
          series: "4",
          repetitions: "12",
          weight: "10",
          restTime: "60",
          videoUrl: "https://www.youtube.com/watch?v=S1HAcTVQVYE",
          instructions:
            "Segure um halter em cada mão e alterne os movimentos, flexionando um braço de cada vez até a altura do ombro e retornando lentamente à posição inicial.",
        },
        {
          name: "Rosca Scott com Barra W",
          series: "4",
          repetitions: "12",
          weight: "20",
          restTime: "60",
          videoUrl: "https://www.youtube.com/watch?v=Kh4G5N48EO8",
          instructions:
            "Utilize um banco Scott e segure a barra W com as mãos na largura dos ombros. Flexione os cotovelos trazendo a barra para cima e depois desça de forma controlada.",
        },
        {
          name: "Rosca Concentrada com Halter",
          series: "4",
          repetitions: "12",
          weight: "10",
          restTime: "60",
          videoUrl: "https://www.youtube.com/watch?v=PcwdHVhWY3s",
          instructions:
            "Sente-se no banco e apoie o cotovelo na coxa. Flexione o braço trazendo o halter em direção ao ombro e depois retorne lentamente à posição inicial.",
        },
      ],
    },
    {
      userId: "user_2tYPPiwlmkzwFQftgQ49Y372EUM",
      name: "Treino B - Costas e Tríceps",
      visibility: "PRIVATE",
      exercises: [
        {
          name: "Levantamento Terra",
          series: "4",
          repetitions: "12",
          weight: "40",
          restTime: "90",
          videoUrl: "https://www.youtube.com/watch?v=50AkPBZwACQ",
          instructions:
            "Mantenha os pés na largura dos ombros, segure a barra com pegada firme e levante-a estendendo os quadris e joelhos. Mantenha a coluna neutra e retorne à posição inicial de forma controlada.",
        },
        {
          name: "Puxada Alta",
          series: "4",
          repetitions: "12",
          weight: "30",
          restTime: "60",
          videoUrl: "https://www.youtube.com/watch?v=9FFLBDWXSZA",
          instructions:
            "Segure a barra com as mãos na largura dos ombros e puxe-a até abaixo do queixo. Mantenha os cotovelos elevados e controle o movimento na descida.",
        },
        {
          name: "Remada Curvado",
          series: "4",
          repetitions: "12",
          weight: "25",
          restTime: "60",
          videoUrl: "https://www.youtube.com/watch?v=TfxJMertfsw",
          instructions:
            "Incline o tronco para frente segurando a barra com pegada pronada. Puxe a barra em direção ao abdômen, contraindo as escápulas, e retorne de forma controlada.",
        },
        {
          name: "Serrote",
          series: "4",
          repetitions: "12",
          weight: "20",
          restTime: "60",
          videoUrl: "https://www.youtube.com/watch?v=m4h4jT9patY",
          instructions:
            "Apoie um joelho e uma mão no banco, segurando o halter com a outra mão. Puxe o halter em direção ao abdômen e retorne lentamente à posição inicial.",
        },
        {
          name: "Tríceps Testa com Barra",
          series: "4",
          repetitions: "12",
          weight: "15",
          restTime: "60",
          videoUrl: "https://www.youtube.com/watch?v=J2g1cJ2lNOg",
          instructions:
            "Deitado no banco reto, segure a barra com pegada fechada e leve-a até a testa flexionando os cotovelos. Estenda os braços para retornar à posição inicial.",
        },
        {
          name: "Tríceps na Polia com Barra",
          series: "4",
          repetitions: "12",
          weight: "25",
          restTime: "60",
          videoUrl: "https://www.youtube.com/watch?v=9cmeOVHOjck",
          instructions:
            "Segure a barra na polia alta com pegada pronada e empurre-a para baixo até a extensão total dos braços. Retorne controladamente à posição inicial.",
        },
        {
          name: "Tríceps Corda na Polia",
          series: "4",
          repetitions: "12",
          weight: "20",
          restTime: "60",
          videoUrl: "https://www.youtube.com/watch?v=TLnIVtuuoYw",
          instructions:
            "Segure a corda na polia alta com pegada neutra e empurre-a para baixo, separando as pontas no final do movimento. Retorne lentamente à posição inicial.",
        },
        {
          name: "Extensão de Tríceps com Halteres Unilateral",
          series: "4",
          repetitions: "12",
          weight: "12",
          restTime: "60",
          videoUrl: "https://www.youtube.com/watch?v=zPAfW4JyUTI",
          instructions:
            "Segure um halter acima da cabeça com uma das mãos e flexione o cotovelo para trás. Retorne à posição inicial estendendo completamente o braço.",
        },
      ],
    },
    {
      userId: "user_2tYPPiwlmkzwFQftgQ49Y372EUM",
      name: "Treino C - Deltoides, Quadríceps e Posterior de Coxa",
      visibility: "PRIVATE",
      exercises: [
        {
          name: "Desenvolvimento de Ombros na Máquina",
          series: "4",
          repetitions: "12",
          weight: "20",
          restTime: "60",
          videoUrl: "https://www.youtube.com/watch?v=uKw0TCpC8-o",
          instructions:
            "Sente-se na máquina, ajuste a altura do banco e segure as alavancas na altura dos ombros. Empurre o peso para cima até estender os braços e retorne de forma controlada.",
        },
        {
          name: "Desenvolvimento com Halteres",
          series: "4",
          repetitions: "12",
          weight: "15",
          restTime: "60",
          videoUrl: "https://www.youtube.com/watch?v=eufDL9MmF8A",
          instructions:
            "Segure um halter em cada mão na altura dos ombros. Pressione os pesos para cima até estender completamente os braços e retorne lentamente.",
        },
        {
          name: "Elevação Frontal com Halteres",
          series: "4",
          repetitions: "12",
          weight: "10",
          restTime: "45",
          videoUrl: "https://www.youtube.com/watch?v=NxSuojHZa8k",
          instructions:
            "Segure um halter em cada mão e levante-os à frente do corpo até a altura dos ombros, mantendo os braços estendidos. Retorne controladamente.",
        },
        {
          name: "Elevação Lateral com Halteres",
          series: "4",
          repetitions: "12",
          weight: "10",
          restTime: "45",
          videoUrl: "https://www.youtube.com/watch?v=IwWvZ0rlNXs",
          instructions:
            "Segure um halter em cada mão ao lado do corpo. Levante os braços lateralmente até a altura dos ombros e desça lentamente.",
        },
        {
          name: "Crucifixo Invertido Usando o Voador",
          series: "4",
          repetitions: "12",
          weight: "15",
          restTime: "60",
          videoUrl: "https://www.youtube.com/watch?v=wjlX-5DTjBQ",
          instructions:
            "Sente-se no voador de costas para o apoio. Segure as alças e abra os braços para trás, contraindo os deltoides posteriores, e retorne controladamente.",
        },
        {
          name: "Agachamento Livre",
          series: "4",
          repetitions: "12",
          weight: "40",
          restTime: "90",
          videoUrl: "https://www.youtube.com/watch?v=rM6SDUdl9fs",
          instructions:
            "Mantenha os pés afastados na largura dos ombros e segure a barra sobre as costas. Agache-se até os joelhos formarem um ângulo de 90° e volte à posição inicial.",
        },
        {
          name: "Leg Press",
          series: "4",
          repetitions: "12",
          weight: "80",
          restTime: "90",
          videoUrl: "https://www.youtube.com/watch?v=nY8UsiAqwds",
          instructions:
            "Posicione os pés na plataforma da máquina de leg press e empurre o peso para cima estendendo as pernas. Retorne controladamente até um ângulo de 90°.",
        },
        {
          name: "Avanço com Halteres",
          series: "3",
          repetitions: "12",
          weight: "15",
          restTime: "60",
          videoUrl: "https://www.youtube.com/watch?v=koeV-24SQOo",
          instructions:
            "Segure um halter em cada mão e dê um passo à frente, flexionando o joelho até formar um ângulo de 90°. Retorne à posição inicial e alterne as pernas.",
        },
        {
          name: "Máquina Flexora",
          series: "4",
          repetitions: "12",
          weight: "25",
          restTime: "60",
          videoUrl: "https://www.youtube.com/watch?v=5yaWMXbkCGs",
          instructions:
            "Sente-se na máquina flexora e ajuste o apoio para os tornozelos. Flexione os joelhos contra a resistência e retorne lentamente.",
        },
        {
          name: "Stiff com Barra",
          series: "2",
          repetitions: "12",
          weight: "30",
          restTime: "60",
          videoUrl: "https://www.youtube.com/watch?v=u1E3_u2gJYE",
          instructions:
            "Segure a barra com pegada pronada e desça o tronco mantendo as costas retas. Retorne à posição inicial contraindo os glúteos e posteriores da coxa.",
        },
      ],
    },
    {
      userId: "user_2tYPPiwlmkzwFQftgQ49Y372EUM",
      name: "Treino D - Peito e Bíceps",
      visibility: "PRIVATE",
      exercises: [
        {
          name: "Supino Reto",
          series: "4",
          repetitions: "12",
          weight: "20",
          restTime: "60",
          videoUrl: "https://www.youtube.com/watch?v=EZMYCLKuGow",
          instructions:
            "Deite-se no banco reto com os pés firmes no chão e segure a barra com as mãos um pouco além da largura dos ombros. Retire a barra do suporte e desça-a de forma controlada até a linha do peitoral. Em seguida, empurre a barra para cima até estender completamente os braços. Mantenha a postura estável e respire corretamente durante o movimento.",
        },
        {
          name: "Supino Inclinado",
          series: "4",
          repetitions: "12",
          weight: "20",
          restTime: "60",
          videoUrl: "https://www.youtube.com/watch?v=WP1VLAt8hbM",
          instructions:
            "Sente-se no banco inclinado e segure a barra com as mãos um pouco além da largura dos ombros. Desça a barra controladamente até a parte superior do peitoral e depois empurre para cima até a extensão completa dos braços.",
        },
        {
          name: "Pullover",
          series: "4",
          repetitions: "12",
          weight: "15",
          restTime: "60",
          videoUrl: "https://www.youtube.com/watch?v=-KaMXMMIVrU",
          instructions:
            "Deite-se em um banco e segure um halter com ambas as mãos acima do peito. Leve o halter para trás da cabeça de forma controlada e retorne à posição inicial, mantendo os braços levemente flexionados.",
        },
        {
          name: "Crossover",
          series: "4",
          repetitions: "12",
          weight: "10",
          restTime: "60",
          videoUrl: "https://www.youtube.com/watch?v=jqTlJt3JXzQ",
          instructions:
            "Segure as manoplas do crossover na altura dos ombros, mantenha os braços levemente flexionados e traga as manoplas para frente, cruzando na frente do peito. Retorne lentamente à posição inicial.",
        },
        {
          name: "Rosca Direta com Barra",
          series: "4",
          repetitions: "12",
          weight: "15",
          restTime: "60",
          videoUrl: "https://www.youtube.com/watch?v=s4B8UW3BMqk",
          instructions:
            "Segure a barra com as mãos na largura dos ombros, mantendo os cotovelos fixos ao corpo. Flexione os cotovelos trazendo a barra até a altura do peito e depois retorne lentamente à posição inicial.",
        },
        {
          name: "Rosca Alternada com Halteres",
          series: "4",
          repetitions: "12",
          weight: "10",
          restTime: "60",
          videoUrl: "https://www.youtube.com/watch?v=S1HAcTVQVYE",
          instructions:
            "Segure um halter em cada mão e alterne os movimentos, flexionando um braço de cada vez até a altura do ombro e retornando lentamente à posição inicial.",
        },
        {
          name: "Rosca Scott com Barra W",
          series: "4",
          repetitions: "12",
          weight: "20",
          restTime: "60",
          videoUrl: "https://www.youtube.com/watch?v=Kh4G5N48EO8",
          instructions:
            "Utilize um banco Scott e segure a barra W com as mãos na largura dos ombros. Flexione os cotovelos trazendo a barra para cima e depois desça de forma controlada.",
        },
        {
          name: "Rosca Concentrada com Halter",
          series: "4",
          repetitions: "12",
          weight: "10",
          restTime: "60",
          videoUrl: "https://www.youtube.com/watch?v=PcwdHVhWY3s",
          instructions:
            "Sente-se no banco e apoie o cotovelo na coxa. Flexione o braço trazendo o halter em direção ao ombro e depois retorne lentamente à posição inicial.",
        },
      ],
    },
    {
      userId: "user_2tYPPiwlmkzwFQftgQ49Y372EUM",
      name: "Treino E - Costas, Tríceps e Abdômen",
      visibility: "PRIVATE",
      exercises: [
        {
          name: "Remada Alta na Polia",
          series: "4",
          repetitions: "12",
          weight: "40",
          restTime: "90",
          videoUrl: "https://www.youtube.com/watch?v=LVQq6ZnM97U",
          instructions:
            "Ajuste a polia baixa, segure a barra com pegada na largura dos ombros e mantenha a postura reta. Puxe a barra até a altura do peito, mantendo os cotovelos mais altos que as mãos. Retorne lentamente à posição inicial, controlando o movimento.",
        },
        {
          name: "Remada Baixa na Polia",
          series: "4",
          repetitions: "12",
          weight: "40",
          restTime: "90",
          videoUrl: "https://www.youtube.com/watch?v=f8AVh4VBbos",
          instructions:
            "Sente-se na máquina, segure a barra ou alça com as mãos afastadas e puxe em direção ao tronco, mantendo a coluna reta. Retorne lentamente à posição inicial.",
        },
        {
          name: "Remada Unilateral com Halter",
          series: "4",
          repetitions: "12",
          weight: "20",
          restTime: "60",
          videoUrl: "https://www.youtube.com/watch?v=m4h4jT9patY",
          instructions:
            "Apoie um joelho e a mão no banco, segure um halter com a outra mão e puxe em direção ao tronco. Retorne lentamente e repita com o outro braço.",
        },
        {
          name: "Encolhimento de Ombros com Halteres",
          series: "4",
          repetitions: "12",
          weight: "25",
          restTime: "60",
          videoUrl: "https://www.youtube.com/watch?v=YeILDnoeYEk",
          instructions:
            "Segure um halter em cada mão ao lado do corpo e eleve os ombros o máximo possível. Segure por um instante e retorne lentamente.",
        },
        {
          name: "Tríceps Mergulho no Banco",
          series: "4",
          repetitions: "12",
          weight: "Corporal",
          restTime: "60",
          videoUrl: "https://www.youtube.com/watch?v=LdfpvZPnUSI",
          instructions:
            "Apoie as mãos em um banco atrás do corpo e os pés em outro banco ou no chão. Flexione os cotovelos até formar um ângulo de 90° e suba lentamente.",
        },
        {
          name: "Tríceps Francês com Halter",
          series: "4",
          repetitions: "12",
          weight: "12",
          restTime: "60",
          videoUrl: "https://www.youtube.com/watch?v=GKpHcN1xM3o",
          instructions:
            "Segure um halter com ambas as mãos acima da cabeça, flexione os cotovelos até que o peso fique atrás da cabeça e retorne à posição inicial.",
        },
        {
          name: "Mountain climber",
          series: "4",
          repetitions: "60s",
          weight: "Corporal",
          restTime: "60",
          videoUrl: "https://www.youtube.com/watch?v=8wuUiihTbdw",
          instructions:
            "Fique em posição de prancha, com mãos no chão alinhadas aos ombros e corpo reto. Traga os joelhos alternadamente em direção ao peito, mantendo o core contraído. Execute o movimento em ritmo moderado ou acelerado, sem elevar o quadril.",
        },
        {
          name: "Abdominal Infra com Elevação de Pernas",
          series: "4",
          repetitions: "60s",
          weight: "Corporal",
          restTime: "60",
          videoUrl: "https://www.youtube.com/watch?v=lsfYFbfE45o",
          instructions:
            "Deite-se no chão com as mãos ao lado do corpo ou sob o quadril para apoio. Eleve as pernas retas até a posição vertical e desça lentamente sem tocar o chão. Mantenha o core contraído e controle o movimento para máxima ativação do abdômen.",
        },
        {
          name: "Prancha Isométrica",
          series: "4",
          repetitions: "30 - 60 segundos",
          weight: "Corporal",
          restTime: "30",
          videoUrl: "https://www.youtube.com/watch?v=3qTz7853Yiw",
          instructions:
            "Apoie os antebraços no chão e mantenha o corpo reto, contraindo o abdômen. Segure a posição pelo tempo determinado.",
        },
      ],
    },
  ];

  const muscleGroups = [
    {
      id: "1088c521-c4fe-4433-8c67-59cba3c6309c",
      name: "Abdutores",
      description:
        "Os abdutores são um grupo de músculos que têm como função principal afastar um membro do corpo.",
      image:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/muscle-groups/abductors.png",
    },
    {
      id: "d2473611-f71d-4f07-959c-e08f784bf016",
      name: "Abs",
      description:
        "Os músculos abdominais são responsáveis por manter a postura e proteger os órgãos",
      image:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/muscle-groups/abs.png",
    },
    {
      id: "f29afcc3-077c-4821-a014-693e1f83d485",
      name: "Adutores",
      description:
        "Os adutores são um grupo de músculos que têm como função principal aproximar um membro do corpo.",
      image:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/muscle-groups/adductors.png",
    },
    {
      id: "cfc9d0d9-63ce-4765-92cd-7f856c27085b",
      name: "Biceps",
      description:
        "Os músculos bíceps são responsáveis por flexionar o cotovelo e girar o antebraço.",
      image:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/muscle-groups/biceps.png",
    },
    {
      id: "ee38c9bd-1589-40c1-9917-2f4b248da52b",
      name: "Peitoral",
      description:
        "O músculo peitoral é responsável por movimentos de adução e rotação do braço.",
      image:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/muscle-groups/chest.png",
    },
    {
      id: "00390cbe-cf6f-4a5e-850a-9bf3550d335f",
      name: "Antebraço",
      description:
        "Os músculos do antebraço são responsáveis por movimentos de flexão e extensão do punho e dos dedos.",
      image:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/muscle-groups/forearms.png",
    },
    {
      id: "802de8d5-4df6-4da1-94bf-22c92a0b4606",
      name: "Gluteos",
      description:
        "Os músculos glúteos são responsáveis por movimentos de extensão e rotação do quadril.",
      image:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/muscle-groups/glutes.png",
    },
    {
      id: "0c0541d9-e251-40ab-b9cb-65ed4b873c29",
      name: "Isquiotibiais",
      description:
        "Os músculos isquiotibiais são responsáveis por movimentos de flexão do joelho e extensão do quadril.",
      image:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/muscle-groups/hamstrings.png",
    },
    {
      id: "b8dd87b7-39b6-4a66-843c-0f7f77eb143c",
      name: "Flexores do Quadril",
      description:
        "Os músculos flexores do quadril são responsáveis por movimentos de flexão do quadril.",
      image:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/muscle-groups/hipflexors.png",
    },
    {
      id: "b9e37de2-105b-4daa-ba8e-35411a0d5c28",
      name: "Banda Iliotibial",
      description:
        "A banda iliotibial é um tecido fibroso que se estende da crista ilíaca até a tíbia.",
      image:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/muscle-groups/itband.png",
    },
    {
      id: "6beb2180-1553-4989-b3a8-b952b5a10494",
      name: "Dorsais",
      description:
        "Os músculos dorsais são responsáveis por movimentos de extensão e rotação do braço.",
      image:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/muscle-groups/lats.png",
    },
    {
      id: "116ad9ec-fad6-4c38-8c37-9fb5f060ccbe",
      name: "Parte Inferior das Costas",
      description:
        "Os músculos da parte inferior das costas são responsáveis por movimentos de extensão da coluna.",
      image:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/muscle-groups/lowerback.png",
    },
    {
      id: "14378703-be64-49b2-b434-e2317b3f179b",
      name: "Parte Superior das Costas",
      description:
        "Os músculos da parte superior das costas são responsáveis por movimentos de adução e rotação do braço.",
      image:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/muscle-groups/upperback.png",
    },
    {
      id: "f4566ab9-c3bd-4e69-90ff-81e2ae093e44",
      name: "Pescoço",
      description:
        "Os músculos do pescoço são responsáveis por movimentos de flexão, extensão e rotação da cabeça.",
      image:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/muscle-groups/neck.png",
    },
    {
      id: "cd249b03-61e4-4363-b7a7-c7689a4bf1ad",
      name: "Obliquo",
      description:
        "Os músculos oblíquos são responsáveis por movimentos de rotação e flexão do tronco.",
      image:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/muscle-groups/obliques.png",
    },
    {
      id: "e9419c8c-58e2-491d-b60b-bcfaccb24c3e",
      name: "Face Palmar",
      description:
        "Os músculos da face palmar são responsáveis por movimentos de flexão do punho e dos dedos.",
      image:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/muscle-groups/palmarfacsia.png",
    },
    {
      id: "b6576ec6-76b6-4d25-a04a-10259a20b842",
      name: "Face Plantar",
      description:
        "Os músculos da face plantar são responsáveis por movimentos de flexão do tornozelo.",
      image:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/muscle-groups/plantarfascia.png",
    },
    {
      id: "d5f25ec2-3fb8-4839-8ea0-920ff7090299",
      name: "Quadriceps",
      description:
        "Os músculos quadríceps são responsáveis por movimentos de extensão do joelho.",
      image:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/muscle-groups/quads.png",
    },
    {
      id: "76325fb9-e74c-4f0b-872d-59b5c4b56101",
      name: "Ombros",
      description:
        "Os músculos dos ombros são responsáveis por movimentos de abdução, adução e rotação do braço.",
      image:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/muscle-groups/shoulders.png",
    },
    {
      id: "6feef40f-1f0c-4d5c-a5f4-89aa419fea9f",
      name: "Trapézio",
      description:
        "Os músculos trapézios são responsáveis por movimentos de elevação e rotação da escápula.",
      image:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/muscle-groups/traps.png",
    },
    {
      id: "6742531b-eb47-4bb7-b136-be92b2c38db8",
      name: "Triceps",
      description:
        "Os músculos tríceps são responsáveis por movimentos de extensão do cotovelo.",
      image:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/muscle-groups/triceps.png",
    },
  ];

  const getMuscleGroupId = (name) => {
    return muscleGroups.find((muscleGroup) => muscleGroup.name === name).id;
  }

  const muscleGroupExercises = [
    {
      id: "74c92f9a-3249-4ec2-abc8-5cd5110ec14e",
      muscleGroupId: getMuscleGroupId("Abdutores"),
      name: "Abdução de quadril com cabo",
      series: "4",
      repetitions: "12",
      weight: "10",
      restTime: "60",
      instruction: "Fixe a tornozeleira no cabo baixo e posicione-se de lado para a máquina. Mantendo o tronco ereto, afaste a perna lateralmente até a altura do quadril, contraindo os glúteos. Retorne lentamente à posição inicial e repita o movimento.",
      imageUrl: "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/abdu%C3%A7%C3%A3o-de-quadril-com-cabo.png",
      videoUrl: "https://www.youtube.com/watch?v=pA670GpJLmo",
    },
    {
      id: "ebf2a532-edef-4c78-a89f-0d0ae2dd2dc2",
      muscleGroupId: getMuscleGroupId("Abdutores"),
      name: "Máquina de abdução de quadril",
      series: "4",
      repetitions: "12",
      weight: "10",
      restTime: "60",
      instruction: "Sente-se na máquina com as costas apoiadas no encosto e os pés apoiados nos suportes. Afaste as pernas lateralmente até a altura do quadril, contraindo os glúteos. Retorne lentamente à posição inicial e repita o movimento.",
      imageUrl: "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/m%C3%A1quina-de-abdu%C3%A7%C3%A3o-de-quadril.png",
      videoUrl: "https://www.youtube.com/watch?v=Zk-dZLK7JJs"
    }
  ]

  await prisma.user.create({
    data: {
      avatar:
        "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yc3huVHRKUXdKUmdUT2pOQVpuZXFvVTFzelIifQ",
      experience: "ATHLETE",
      goal: "COMPETITION",
      height: 175,
      id: "user_2tYPPiwlmkzwFQftgQ49Y372EUM",
      name: "Rodrigo Viegas Rodrigues",
      publicProfile: true,
      weight: 90,
    },
  });

  for (const muscleGroup of muscleGroups) {
    await prisma.muscleGroup.create({
      data: {
        id: muscleGroup.id,
        name: muscleGroup.name,
        description: muscleGroup.description,
        image: muscleGroup.image,
      },
    });
  }

  for (const muscleGroupExercise of muscleGroupExercises) {
    await prisma.muscleGroupExercise.create({
      data: {
        id: muscleGroupExercise.id,
        muscleGroupId: muscleGroupExercise.muscleGroupId,
        name: muscleGroupExercise.name,
        series: muscleGroupExercise.series,
        repetitions: muscleGroupExercise.repetitions,
        weight: muscleGroupExercise.weight,
        restTime: muscleGroupExercise.restTime,
        instruction: muscleGroupExercise.instruction,
        imageUrl: muscleGroupExercise.imageUrl,
        videoUrl: muscleGroupExercise.videoUrl,
      },
    });
  }

  for (const workoutData of workouts) {
    await prisma.workout.create({
      data: {
        userId: workoutData.userId,
        name: workoutData.name,
        exercises: {
          create: workoutData.exercises.map((exercise) => ({
            name: exercise.name,
            series: exercise.series,
            repetitions: exercise.repetitions,
            weight: exercise.weight,
            restTime: exercise.restTime,
            videoUrl: exercise.videoUrl,
            instructions: exercise.instructions,
          })),
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
