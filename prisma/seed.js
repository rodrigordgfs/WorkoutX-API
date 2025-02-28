import { prisma } from "../src/libs/prisma.js";

async function main() {
  // const workouts = [
  //   {
  //     userId: "user_2tYPPiwlmkzwFQftgQ49Y372EUM",
  //     name: "Treino A - Peito e Bíceps",
  //     visibility: "PRIVATE",
  //     exercises: [
  //       {
  //         name: "Supino Reto",
  //         series: "4",
  //         repetitions: "12",
  //         weight: "20",
  //         restTime: "60",
  //         videoUrl: "https://www.youtube.com/watch?v=EZMYCLKuGow",
  //         instructions:
  //           "Deite-se no banco reto com os pés firmes no chão e segure a barra com as mãos um pouco além da largura dos ombros. Retire a barra do suporte e desça-a de forma controlada até a linha do peitoral. Em seguida, empurre a barra para cima até estender completamente os braços. Mantenha a postura estável e respire corretamente durante o movimento.",
  //       },
  //       {
  //         name: "Supino Inclinado",
  //         series: "4",
  //         repetitions: "12",
  //         weight: "20",
  //         restTime: "60",
  //         videoUrl: "https://www.youtube.com/watch?v=WP1VLAt8hbM",
  //         instructions:
  //           "Sente-se no banco inclinado e segure a barra com as mãos um pouco além da largura dos ombros. Desça a barra controladamente até a parte superior do peitoral e depois empurre para cima até a extensão completa dos braços.",
  //       },
  //       {
  //         name: "Pullover",
  //         series: "4",
  //         repetitions: "12",
  //         weight: "15",
  //         restTime: "60",
  //         videoUrl: "https://www.youtube.com/watch?v=-KaMXMMIVrU",
  //         instructions:
  //           "Deite-se em um banco e segure um halter com ambas as mãos acima do peito. Leve o halter para trás da cabeça de forma controlada e retorne à posição inicial, mantendo os braços levemente flexionados.",
  //       },
  //       {
  //         name: "Crossover",
  //         series: "4",
  //         repetitions: "12",
  //         weight: "10",
  //         restTime: "60",
  //         videoUrl: "https://www.youtube.com/watch?v=jqTlJt3JXzQ",
  //         instructions:
  //           "Segure as manoplas do crossover na altura dos ombros, mantenha os braços levemente flexionados e traga as manoplas para frente, cruzando na frente do peito. Retorne lentamente à posição inicial.",
  //       },
  //       {
  //         name: "Rosca Direta com Barra",
  //         series: "4",
  //         repetitions: "12",
  //         weight: "15",
  //         restTime: "60",
  //         videoUrl: "https://www.youtube.com/watch?v=s4B8UW3BMqk",
  //         instructions:
  //           "Segure a barra com as mãos na largura dos ombros, mantendo os cotovelos fixos ao corpo. Flexione os cotovelos trazendo a barra até a altura do peito e depois retorne lentamente à posição inicial.",
  //       },
  //       {
  //         name: "Rosca Alternada com Halteres",
  //         series: "4",
  //         repetitions: "12",
  //         weight: "10",
  //         restTime: "60",
  //         videoUrl: "https://www.youtube.com/watch?v=S1HAcTVQVYE",
  //         instructions:
  //           "Segure um halter em cada mão e alterne os movimentos, flexionando um braço de cada vez até a altura do ombro e retornando lentamente à posição inicial.",
  //       },
  //       {
  //         name: "Rosca Scott com Barra W",
  //         series: "4",
  //         repetitions: "12",
  //         weight: "20",
  //         restTime: "60",
  //         videoUrl: "https://www.youtube.com/watch?v=Kh4G5N48EO8",
  //         instructions:
  //           "Utilize um banco Scott e segure a barra W com as mãos na largura dos ombros. Flexione os cotovelos trazendo a barra para cima e depois desça de forma controlada.",
  //       },
  //       {
  //         name: "Rosca Concentrada com Halter",
  //         series: "4",
  //         repetitions: "12",
  //         weight: "10",
  //         restTime: "60",
  //         videoUrl: "https://www.youtube.com/watch?v=PcwdHVhWY3s",
  //         instructions:
  //           "Sente-se no banco e apoie o cotovelo na coxa. Flexione o braço trazendo o halter em direção ao ombro e depois retorne lentamente à posição inicial.",
  //       },
  //     ],
  //   },
  //   {
  //     userId: "user_2tYPPiwlmkzwFQftgQ49Y372EUM",
  //     name: "Treino B - Costas e Tríceps",
  //     visibility: "PRIVATE",
  //     exercises: [
  //       {
  //         name: "Levantamento Terra",
  //         series: "4",
  //         repetitions: "12",
  //         weight: "40",
  //         restTime: "90",
  //         videoUrl: "https://www.youtube.com/watch?v=50AkPBZwACQ",
  //         instructions:
  //           "Mantenha os pés na largura dos ombros, segure a barra com pegada firme e levante-a estendendo os quadris e joelhos. Mantenha a coluna neutra e retorne à posição inicial de forma controlada.",
  //       },
  //       {
  //         name: "Puxada Alta",
  //         series: "4",
  //         repetitions: "12",
  //         weight: "30",
  //         restTime: "60",
  //         videoUrl: "https://www.youtube.com/watch?v=9FFLBDWXSZA",
  //         instructions:
  //           "Segure a barra com as mãos na largura dos ombros e puxe-a até abaixo do queixo. Mantenha os cotovelos elevados e controle o movimento na descida.",
  //       },
  //       {
  //         name: "Remada Curvado",
  //         series: "4",
  //         repetitions: "12",
  //         weight: "25",
  //         restTime: "60",
  //         videoUrl: "https://www.youtube.com/watch?v=TfxJMertfsw",
  //         instructions:
  //           "Incline o tronco para frente segurando a barra com pegada pronada. Puxe a barra em direção ao abdômen, contraindo as escápulas, e retorne de forma controlada.",
  //       },
  //       {
  //         name: "Serrote",
  //         series: "4",
  //         repetitions: "12",
  //         weight: "20",
  //         restTime: "60",
  //         videoUrl: "https://www.youtube.com/watch?v=m4h4jT9patY",
  //         instructions:
  //           "Apoie um joelho e uma mão no banco, segurando o halter com a outra mão. Puxe o halter em direção ao abdômen e retorne lentamente à posição inicial.",
  //       },
  //       {
  //         name: "Tríceps Testa com Barra",
  //         series: "4",
  //         repetitions: "12",
  //         weight: "15",
  //         restTime: "60",
  //         videoUrl: "https://www.youtube.com/watch?v=J2g1cJ2lNOg",
  //         instructions:
  //           "Deitado no banco reto, segure a barra com pegada fechada e leve-a até a testa flexionando os cotovelos. Estenda os braços para retornar à posição inicial.",
  //       },
  //       {
  //         name: "Tríceps na Polia com Barra",
  //         series: "4",
  //         repetitions: "12",
  //         weight: "25",
  //         restTime: "60",
  //         videoUrl: "https://www.youtube.com/watch?v=9cmeOVHOjck",
  //         instructions:
  //           "Segure a barra na polia alta com pegada pronada e empurre-a para baixo até a extensão total dos braços. Retorne controladamente à posição inicial.",
  //       },
  //       {
  //         name: "Tríceps Corda na Polia",
  //         series: "4",
  //         repetitions: "12",
  //         weight: "20",
  //         restTime: "60",
  //         videoUrl: "https://www.youtube.com/watch?v=TLnIVtuuoYw",
  //         instructions:
  //           "Segure a corda na polia alta com pegada neutra e empurre-a para baixo, separando as pontas no final do movimento. Retorne lentamente à posição inicial.",
  //       },
  //       {
  //         name: "Extensão de Tríceps com Halteres Unilateral",
  //         series: "4",
  //         repetitions: "12",
  //         weight: "12",
  //         restTime: "60",
  //         videoUrl: "https://www.youtube.com/watch?v=zPAfW4JyUTI",
  //         instructions:
  //           "Segure um halter acima da cabeça com uma das mãos e flexione o cotovelo para trás. Retorne à posição inicial estendendo completamente o braço.",
  //       },
  //     ],
  //   },
  //   {
  //     userId: "user_2tYPPiwlmkzwFQftgQ49Y372EUM",
  //     name: "Treino C - Deltoides, Quadríceps e Posterior de Coxa",
  //     visibility: "PRIVATE",
  //     exercises: [
  //       {
  //         name: "Desenvolvimento de Ombros na Máquina",
  //         series: "4",
  //         repetitions: "12",
  //         weight: "20",
  //         restTime: "60",
  //         videoUrl: "https://www.youtube.com/watch?v=uKw0TCpC8-o",
  //         instructions:
  //           "Sente-se na máquina, ajuste a altura do banco e segure as alavancas na altura dos ombros. Empurre o peso para cima até estender os braços e retorne de forma controlada.",
  //       },
  //       {
  //         name: "Desenvolvimento com Halteres",
  //         series: "4",
  //         repetitions: "12",
  //         weight: "15",
  //         restTime: "60",
  //         videoUrl: "https://www.youtube.com/watch?v=eufDL9MmF8A",
  //         instructions:
  //           "Segure um halter em cada mão na altura dos ombros. Pressione os pesos para cima até estender completamente os braços e retorne lentamente.",
  //       },
  //       {
  //         name: "Elevação Frontal com Halteres",
  //         series: "4",
  //         repetitions: "12",
  //         weight: "10",
  //         restTime: "45",
  //         videoUrl: "https://www.youtube.com/watch?v=NxSuojHZa8k",
  //         instructions:
  //           "Segure um halter em cada mão e levante-os à frente do corpo até a altura dos ombros, mantendo os braços estendidos. Retorne controladamente.",
  //       },
  //       {
  //         name: "Elevação Lateral com Halteres",
  //         series: "4",
  //         repetitions: "12",
  //         weight: "10",
  //         restTime: "45",
  //         videoUrl: "https://www.youtube.com/watch?v=IwWvZ0rlNXs",
  //         instructions:
  //           "Segure um halter em cada mão ao lado do corpo. Levante os braços lateralmente até a altura dos ombros e desça lentamente.",
  //       },
  //       {
  //         name: "Crucifixo Invertido Usando o Voador",
  //         series: "4",
  //         repetitions: "12",
  //         weight: "15",
  //         restTime: "60",
  //         videoUrl: "https://www.youtube.com/watch?v=wjlX-5DTjBQ",
  //         instructions:
  //           "Sente-se no voador de costas para o apoio. Segure as alças e abra os braços para trás, contraindo os deltoides posteriores, e retorne controladamente.",
  //       },
  //       {
  //         name: "Agachamento Livre",
  //         series: "4",
  //         repetitions: "12",
  //         weight: "40",
  //         restTime: "90",
  //         videoUrl: "https://www.youtube.com/watch?v=rM6SDUdl9fs",
  //         instructions:
  //           "Mantenha os pés afastados na largura dos ombros e segure a barra sobre as costas. Agache-se até os joelhos formarem um ângulo de 90° e volte à posição inicial.",
  //       },
  //       {
  //         name: "Leg Press",
  //         series: "4",
  //         repetitions: "12",
  //         weight: "80",
  //         restTime: "90",
  //         videoUrl: "https://www.youtube.com/watch?v=nY8UsiAqwds",
  //         instructions:
  //           "Posicione os pés na plataforma da máquina de leg press e empurre o peso para cima estendendo as pernas. Retorne controladamente até um ângulo de 90°.",
  //       },
  //       {
  //         name: "Avanço com Halteres",
  //         series: "3",
  //         repetitions: "12",
  //         weight: "15",
  //         restTime: "60",
  //         videoUrl: "https://www.youtube.com/watch?v=koeV-24SQOo",
  //         instructions:
  //           "Segure um halter em cada mão e dê um passo à frente, flexionando o joelho até formar um ângulo de 90°. Retorne à posição inicial e alterne as pernas.",
  //       },
  //       {
  //         name: "Máquina Flexora",
  //         series: "4",
  //         repetitions: "12",
  //         weight: "25",
  //         restTime: "60",
  //         videoUrl: "https://www.youtube.com/watch?v=5yaWMXbkCGs",
  //         instructions:
  //           "Sente-se na máquina flexora e ajuste o apoio para os tornozelos. Flexione os joelhos contra a resistência e retorne lentamente.",
  //       },
  //       {
  //         name: "Stiff com Barra",
  //         series: "2",
  //         repetitions: "12",
  //         weight: "30",
  //         restTime: "60",
  //         videoUrl: "https://www.youtube.com/watch?v=u1E3_u2gJYE",
  //         instructions:
  //           "Segure a barra com pegada pronada e desça o tronco mantendo as costas retas. Retorne à posição inicial contraindo os glúteos e posteriores da coxa.",
  //       },
  //     ],
  //   },
  //   {
  //     userId: "user_2tYPPiwlmkzwFQftgQ49Y372EUM",
  //     name: "Treino D - Peito e Bíceps",
  //     visibility: "PRIVATE",
  //     exercises: [
  //       {
  //         name: "Supino Reto",
  //         series: "4",
  //         repetitions: "12",
  //         weight: "20",
  //         restTime: "60",
  //         videoUrl: "https://www.youtube.com/watch?v=EZMYCLKuGow",
  //         instructions:
  //           "Deite-se no banco reto com os pés firmes no chão e segure a barra com as mãos um pouco além da largura dos ombros. Retire a barra do suporte e desça-a de forma controlada até a linha do peitoral. Em seguida, empurre a barra para cima até estender completamente os braços. Mantenha a postura estável e respire corretamente durante o movimento.",
  //       },
  //       {
  //         name: "Supino Inclinado",
  //         series: "4",
  //         repetitions: "12",
  //         weight: "20",
  //         restTime: "60",
  //         videoUrl: "https://www.youtube.com/watch?v=WP1VLAt8hbM",
  //         instructions:
  //           "Sente-se no banco inclinado e segure a barra com as mãos um pouco além da largura dos ombros. Desça a barra controladamente até a parte superior do peitoral e depois empurre para cima até a extensão completa dos braços.",
  //       },
  //       {
  //         name: "Pullover",
  //         series: "4",
  //         repetitions: "12",
  //         weight: "15",
  //         restTime: "60",
  //         videoUrl: "https://www.youtube.com/watch?v=-KaMXMMIVrU",
  //         instructions:
  //           "Deite-se em um banco e segure um halter com ambas as mãos acima do peito. Leve o halter para trás da cabeça de forma controlada e retorne à posição inicial, mantendo os braços levemente flexionados.",
  //       },
  //       {
  //         name: "Crossover",
  //         series: "4",
  //         repetitions: "12",
  //         weight: "10",
  //         restTime: "60",
  //         videoUrl: "https://www.youtube.com/watch?v=jqTlJt3JXzQ",
  //         instructions:
  //           "Segure as manoplas do crossover na altura dos ombros, mantenha os braços levemente flexionados e traga as manoplas para frente, cruzando na frente do peito. Retorne lentamente à posição inicial.",
  //       },
  //       {
  //         name: "Rosca Direta com Barra",
  //         series: "4",
  //         repetitions: "12",
  //         weight: "15",
  //         restTime: "60",
  //         videoUrl: "https://www.youtube.com/watch?v=s4B8UW3BMqk",
  //         instructions:
  //           "Segure a barra com as mãos na largura dos ombros, mantendo os cotovelos fixos ao corpo. Flexione os cotovelos trazendo a barra até a altura do peito e depois retorne lentamente à posição inicial.",
  //       },
  //       {
  //         name: "Rosca Alternada com Halteres",
  //         series: "4",
  //         repetitions: "12",
  //         weight: "10",
  //         restTime: "60",
  //         videoUrl: "https://www.youtube.com/watch?v=S1HAcTVQVYE",
  //         instructions:
  //           "Segure um halter em cada mão e alterne os movimentos, flexionando um braço de cada vez até a altura do ombro e retornando lentamente à posição inicial.",
  //       },
  //       {
  //         name: "Rosca Scott com Barra W",
  //         series: "4",
  //         repetitions: "12",
  //         weight: "20",
  //         restTime: "60",
  //         videoUrl: "https://www.youtube.com/watch?v=Kh4G5N48EO8",
  //         instructions:
  //           "Utilize um banco Scott e segure a barra W com as mãos na largura dos ombros. Flexione os cotovelos trazendo a barra para cima e depois desça de forma controlada.",
  //       },
  //       {
  //         name: "Rosca Concentrada com Halter",
  //         series: "4",
  //         repetitions: "12",
  //         weight: "10",
  //         restTime: "60",
  //         videoUrl: "https://www.youtube.com/watch?v=PcwdHVhWY3s",
  //         instructions:
  //           "Sente-se no banco e apoie o cotovelo na coxa. Flexione o braço trazendo o halter em direção ao ombro e depois retorne lentamente à posição inicial.",
  //       },
  //     ],
  //   },
  //   {
  //     userId: "user_2tYPPiwlmkzwFQftgQ49Y372EUM",
  //     name: "Treino E - Costas, Tríceps e Abdômen",
  //     visibility: "PRIVATE",
  //     exercises: [
  //       {
  //         name: "Remada Alta na Polia",
  //         series: "4",
  //         repetitions: "12",
  //         weight: "40",
  //         restTime: "90",
  //         videoUrl: "https://www.youtube.com/watch?v=LVQq6ZnM97U",
  //         instructions:
  //           "Ajuste a polia baixa, segure a barra com pegada na largura dos ombros e mantenha a postura reta. Puxe a barra até a altura do peito, mantendo os cotovelos mais altos que as mãos. Retorne lentamente à posição inicial, controlando o movimento.",
  //       },
  //       {
  //         name: "Remada Baixa na Polia",
  //         series: "4",
  //         repetitions: "12",
  //         weight: "40",
  //         restTime: "90",
  //         videoUrl: "https://www.youtube.com/watch?v=f8AVh4VBbos",
  //         instructions:
  //           "Sente-se na máquina, segure a barra ou alça com as mãos afastadas e puxe em direção ao tronco, mantendo a coluna reta. Retorne lentamente à posição inicial.",
  //       },
  //       {
  //         name: "Remada Unilateral com Halter",
  //         series: "4",
  //         repetitions: "12",
  //         weight: "20",
  //         restTime: "60",
  //         videoUrl: "https://www.youtube.com/watch?v=m4h4jT9patY",
  //         instructions:
  //           "Apoie um joelho e a mão no banco, segure um halter com a outra mão e puxe em direção ao tronco. Retorne lentamente e repita com o outro braço.",
  //       },
  //       {
  //         name: "Encolhimento de Ombros com Halteres",
  //         series: "4",
  //         repetitions: "12",
  //         weight: "25",
  //         restTime: "60",
  //         videoUrl: "https://www.youtube.com/watch?v=YeILDnoeYEk",
  //         instructions:
  //           "Segure um halter em cada mão ao lado do corpo e eleve os ombros o máximo possível. Segure por um instante e retorne lentamente.",
  //       },
  //       {
  //         name: "Tríceps Mergulho no Banco",
  //         series: "4",
  //         repetitions: "12",
  //         weight: "Corporal",
  //         restTime: "60",
  //         videoUrl: "https://www.youtube.com/watch?v=LdfpvZPnUSI",
  //         instructions:
  //           "Apoie as mãos em um banco atrás do corpo e os pés em outro banco ou no chão. Flexione os cotovelos até formar um ângulo de 90° e suba lentamente.",
  //       },
  //       {
  //         name: "Tríceps Francês com Halter",
  //         series: "4",
  //         repetitions: "12",
  //         weight: "12",
  //         restTime: "60",
  //         videoUrl: "https://www.youtube.com/watch?v=GKpHcN1xM3o",
  //         instructions:
  //           "Segure um halter com ambas as mãos acima da cabeça, flexione os cotovelos até que o peso fique atrás da cabeça e retorne à posição inicial.",
  //       },
  //       {
  //         name: "Mountain climber",
  //         series: "4",
  //         repetitions: "60s",
  //         weight: "Corporal",
  //         restTime: "60",
  //         videoUrl: "https://www.youtube.com/watch?v=8wuUiihTbdw",
  //         instructions:
  //           "Fique em posição de prancha, com mãos no chão alinhadas aos ombros e corpo reto. Traga os joelhos alternadamente em direção ao peito, mantendo o core contraído. Execute o movimento em ritmo moderado ou acelerado, sem elevar o quadril.",
  //       },
  //       {
  //         name: "Abdominal Infra com Elevação de Pernas",
  //         series: "4",
  //         repetitions: "60s",
  //         weight: "Corporal",
  //         restTime: "60",
  //         videoUrl: "https://www.youtube.com/watch?v=lsfYFbfE45o",
  //         instructions:
  //           "Deite-se no chão com as mãos ao lado do corpo ou sob o quadril para apoio. Eleve as pernas retas até a posição vertical e desça lentamente sem tocar o chão. Mantenha o core contraído e controle o movimento para máxima ativação do abdômen.",
  //       },
  //       {
  //         name: "Prancha Isométrica",
  //         series: "4",
  //         repetitions: "30 - 60 segundos",
  //         weight: "Corporal",
  //         restTime: "30",
  //         videoUrl: "https://www.youtube.com/watch?v=3qTz7853Yiw",
  //         instructions:
  //           "Apoie os antebraços no chão e mantenha o corpo reto, contraindo o abdômen. Segure a posição pelo tempo determinado.",
  //       },
  //     ],
  //   },
  // ];

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
  };

  const exercises = [
    {
      id: "74c92f9a-3249-4ec2-abc8-5cd5110ec14e",
      muscleGroupId: getMuscleGroupId("Abdutores"),
      name: "Abdução de quadril com cabo",
      series: "4",
      repetitions: "12",
      weight: "10",
      restTime: "60",
      instructions:
        "Fixe a tornozeleira no cabo baixo e posicione-se de lado para a máquina. Mantendo o tronco ereto, afaste a perna lateralmente até a altura do quadril, contraindo os glúteos. Retorne lentamente à posição inicial e repita o movimento.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Abdutores/abdu%C3%A7%C3%A3o-de-quadril-com-cabo.png",
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
      instructions:
        "Sente-se na máquina com as costas apoiadas no encosto e os pés apoiados nos suportes. Afaste as pernas lateralmente até a altura do quadril, contraindo os glúteos. Retorne lentamente à posição inicial e repita o movimento.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Abdutores/m%C3%A1quina-de-abdu%C3%A7%C3%A3o-de-quadril.png",
      videoUrl: "https://www.youtube.com/watch?v=Zk-dZLK7JJs",
    },
    {
      id: "7c8340d1-a9a6-4de5-8001-142619940d38",
      muscleGroupId: getMuscleGroupId("Abs"),
      name: "Crunch ponderado",
      series: "4",
      repetitions: "12",
      weight: "10",
      restTime: "60",
      instructions:
        "Deite-se no chão com os joelhos flexionados e os pés apoiados. Segure um peso próximo ao peito e realize a flexão do tronco, contraindo o abdômen. Retorne lentamente à posição inicial e repita o movimento.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Abs/Crunch+ponderado.png",
      videoUrl: "https://www.youtube.com/watch?v=SYVcZ97T78E",
    },
    {
      id: "5ef04923-daba-44b6-8b0d-68f5ecab58d6",
      muscleGroupId: getMuscleGroupId("Abs"),
      name: "Elevação de pernas no chão deitado",
      series: "4",
      repetitions: "12",
      weight: "Corporal",
      restTime: "60",
      instructions:
        "Deite-se no chão com as pernas estendidas e as mãos apoiadas sob o quadril. Eleve as pernas até a posição vertical, contraindo o abdômen. Desça lentamente à posição inicial e repita o movimento.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Abs/Eleva%C3%A7%C3%A3o+de+pernas+no+ch%C3%A3o+deitado.png",
      videoUrl: "https://www.youtube.com/watch?v=lsfYFbfE45o",
    },
    {
      id: "8142b414-c513-4780-990e-b5ad216f6952",
      muscleGroupId: getMuscleGroupId("Abs"),
      name: "Crunch de cabo",
      series: "4",
      repetitions: "12",
      weight: "10",
      restTime: "60",
      instructions:
        "Ajoelhe-se de frente para a polia alta e segure a corda com as mãos. Flexione o tronco, contraindo o abdômen, e retorne lentamente à posição inicial.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Abs/Crunch+de+cabo.png",
      videoUrl: "https://www.youtube.com/watch?v=RXlO_LaEozQ",
    },
    {
      id: "742af8c8-4638-4b42-98be-9b87b62c87f6",
      muscleGroupId: getMuscleGroupId("Abs"),
      name: "Prancha",
      series: "4",
      repetitions: "60s",
      weight: "Corporal",
      restTime: "60",
      instructions:
        "Apoie os antebraços no chão e mantenha o corpo reto, contraindo o abdômen. Segure a posição pelo tempo determinado.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Abs/Prancha.png",
      videoUrl: "https://www.youtube.com/watch?v=qNRqGqESAWU",
    },
    {
      id: "01993d74-9ecd-4174-9a0f-e653e7106683",
      muscleGroupId: getMuscleGroupId("Abs"),
      name: "Flexões laterais com halteres",
      series: "4",
      repetitions: "12",
      weight: "10",
      restTime: "60",
      instructions:
        "Segure um halter em uma das mãos e incline o tronco para o lado oposto. Retorne lentamente à posição inicial e repita o movimento.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Abs/Flex%C3%B5es+laterais+com+halteres.png",
      videoUrl: "https://www.youtube.com/watch?v=j0zbyFjLfxs",
    },
    {
      id: "136988fe-c66a-4cfb-a6e3-572d7262a2ae",
      muscleGroupId: getMuscleGroupId("Abs"),
      name: "Elevação de perna pendurada",
      series: "4",
      repetitions: "12",
      weight: "Corporal",
      restTime: "60",
      instructions:
        "Pendure-se em uma barra fixa e eleve as pernas até a posição vertical, contraindo o abdômen. Desça lentamente à posição inicial e repita o movimento.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Abs/Eleva%C3%A7%C3%A3o+de+perna+pendurada.png",
      videoUrl: "https://www.youtube.com/watch?v=AcVENMSAaw0",
    },
    {
      id: "68bf21e1-0f2a-4c4c-8e1e-65d0d0852db8",
      muscleGroupId: getMuscleGroupId("Abs"),
      name: "Abdominal Declinado",
      series: "4",
      repetitions: "12",
      weight: "20",
      restTime: "60",
      instructions:
        "Apoie os pés no suporte e as costas no banco declinado. Realize a flexão do tronco, contraindo o abdômen, e retorne lentamente à posição inicial.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Abs/Supino+Declinado.png",
      videoUrl: "https://www.youtube.com/watch?v=HybGC-pfYfk",
    },
    {
      id: "08a0f839-2514-49da-a8b3-3a03788f0481",
      muscleGroupId: getMuscleGroupId("Abs"),
      name: "Sit Up",
      series: "4",
      repetitions: "12",
      weight: "Corporal",
      restTime: "60",
      instructions:
        "Deite-se no chão com os joelhos flexionados e os pés apoiados. Realize a flexão do tronco, contraindo o abdômen, e retorne lentamente à posição inicial.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Abs/Sente-se.png",
      videoUrl: "https://www.youtube.com/watch?v=q4ap_8wpaF8",
    },
    {
      id: "8dff9060-82f0-4d34-99c8-29bc13f6d7af",
      muscleGroupId: getMuscleGroupId("Abs"),
      name: "Prancha lateral",
      series: "4",
      repetitions: "60s",
      weight: "Corporal",
      restTime: "60",
      instructions:
        "Apoie o antebraço no chão e mantenha o corpo reto, contraindo o abdômen. Segure a posição pelo tempo determinado e repita do outro lado.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Abs/Prancha+lateral.png",
      videoUrl: "https://www.youtube.com/watch?v=7tG9MOqudhE",
    },
    {
      id: "d8e263a9-f4d8-4e61-b53d-55dc63cb3055",
      muscleGroupId: getMuscleGroupId("Abs"),
      name: "Rolamentos abdominais com barra",
      series: "4",
      repetitions: "12",
      weight: "Corporal",
      restTime: "60",
      instructions:
        "Apoie as mãos na barra e mantenha o corpo reto, contraindo o abdômen. Realize o movimento de rotação do tronco e retorne à posição inicial.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Abs/Rolamentos+abdominais+com+barra.png",
      videoUrl: "https://www.youtube.com/watch?v=bwdPuXhgTcQ",
    },
    {
      id: "86fdb79c-4632-4e4c-9cb2-4f4910af7a92",
      muscleGroupId: getMuscleGroupId("Abs"),
      name: "Abdominal Crunch",
      series: "4",
      repetitions: "12",
      weight: "Corporal",
      restTime: "60",
      instructions:
        "Deite-se no chão com os joelhos flexionados e os pés apoiados. Realize a flexão do tronco, contraindo o abdômen, e retorne lentamente à posição inicial.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Abs/Abdominal+Crunch.png",
      videoUrl: "https://www.youtube.com/watch?v=O0pIQ2UqeCY",
    },
    {
      id: "b5a844a8-11ad-4aaf-911c-93275c98a8a3",
      muscleGroupId: getMuscleGroupId("Abs"),
      name: "Bicicleta de ar abdominal",
      series: "4",
      repetitions: "60s",
      weight: "Corporal",
      restTime: "60",
      instructions:
        "Deite-se no chão com as mãos atrás da cabeça e as pernas elevadas. Realize o movimento de pedalar, contraindo o abdômen.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Abs/Bicicleta+de+ar+abdominal+(tamb%C3%A9m+conhecida+como+bicicleta).png",
      videoUrl: "https://www.youtube.com/watch?v=oB6Hn_PaM9U",
    },
    {
      id: "f82f6ad5-4a14-4982-8b90-1b9666c37700",
      muscleGroupId: getMuscleGroupId("Abs"),
      name: "Alpinista giratório",
      series: "4",
      repetitions: "60s",
      weight: "Corporal",
      restTime: "60",
      instructions:
        "Fique em posição de prancha, com mãos no chão alinhadas aos ombros e corpo reto. Traga os joelhos alternadamente em direção ao peito, mantendo o core contraído. Execute o movimento em ritmo moderado ou acelerado, sem elevar o quadril.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Abs/Alpinista+girat%C3%B3rio.png",
      videoUrl: "https://www.youtube.com/watch?v=JEp42h1Lf2I",
    },
    {
      id: "1bb76910-c195-4c11-b371-ed48f9010283",
      muscleGroupId: getMuscleGroupId("Abs"),
      name: "Abdominal no chão (pernas no banco)",
      series: "4",
      repetitions: "12",
      weight: "Corporal",
      restTime: "60",
      instructions:
        "Deite-se no chão com as pernas apoiadas em um banco e as mãos atrás da cabeça. Realize a flexão do tronco, contraindo o abdômen, e retorne lentamente à posição inicial.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Abs/Abdominal+no+ch%C3%A3o+(pernas+no+banco).png",
      videoUrl: "https://www.youtube.com/watch?v=fN1zziClTfE",
    },
    {
      id: "001bf37b-4035-4c50-96e9-4e2a96024492",
      muscleGroupId: getMuscleGroupId("Abs"),
      name: "Elevação de joelho pendurado com torção",
      series: "4",
      repetitions: "12",
      weight: "Corporal",
      restTime: "60",
      instructions:
        "Pendure-se em uma barra fixa e eleve os joelhos em direção ao peito, contraindo o abdômen. Realize o movimento de torção do tronco e retorne à posição inicial.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Abs/Eleva%C3%A7%C3%A3o+de+joelho+pendurado+com+tor%C3%A7%C3%A3o.png",
      videoUrl: "https://www.youtube.com/watch?v=zeyjlC748CM",
    },
    {
      id: "bdfa7b95-a108-4a6c-baac-4c0eb9cce9c3",
      muscleGroupId: getMuscleGroupId("Abs"),
      name: "Joelho dobrado no chão deitado",
      series: "4",
      repetitions: "12",
      weight: "Corporal",
      restTime: "60",
      instructions:
        "Deite-se no chão com os joelhos flexionados e os pés apoiados. Realize a flexão do tronco, contraindo o abdômen, e retorne lentamente à posição inicial.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Abs/Joelho+dobrado+no+ch%C3%A3o+deitado.png",
      videoUrl: "https://www.youtube.com/watch?v=V95h0UX8UyI&",
    },
    {
      id: "d9938d1f-7c0a-4407-b465-e54aa851b7c0",
      muscleGroupId: getMuscleGroupId("Abs"),
      name: "Elevação de joelho pendurado",
      series: "4",
      repetitions: "12",
      weight: "Corporal",
      restTime: "60",
      instructions:
        "Pendure-se em uma barra fixa e eleve os joelhos em direção ao peito, contraindo o abdômen. Desça lentamente à posição inicial e repita o movimento.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Abs/Eleva%C3%A7%C3%A3o+de+joelho+pendurado.png",
      videoUrl: "https://www.youtube.com/watch?v=crMmq9UwiHo",
    },
    {
      id: "a49ca6cc-59ba-4a54-94c9-e2b7d0426972",
      muscleGroupId: getMuscleGroupId("Abs"),
      name: "Bola de Exercício Crunch",
      series: "4",
      repetitions: "12",
      weight: "Corporal",
      restTime: "60",
      instructions:
        "Deite-se sobre a bola de exercício com os pés apoiados no chão e as mãos atrás da cabeça. Realize a flexão do tronco, contraindo o abdômen, e retorne lentamente à posição inicial.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Abs/Bola+de+Exerc%C3%ADcio+Crunch.png",
      videoUrl: "https://www.youtube.com/watch?v=5FAdaEJUlhc",
    },
    {
      id: "aa233cd3-a24c-482e-ace6-9dfad8ffb6fa",
      muscleGroupId: getMuscleGroupId("Abs"),
      name: "Torção Russa",
      series: "4",
      repetitions: "12",
      weight: "Corporal",
      restTime: "60",
      instructions:
        "Sente-se no chão com os joelhos flexionados e os pés apoiados. Segure um peso com as duas mãos e realize o movimento de torção do tronco, contraindo o abdômen.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Abs/Tor%C3%A7%C3%A3o+Russa.png",
      videoUrl: "https://www.youtube.com/watch?v=Y9ApG7MWIuA",
    },
    {
      id: "32e8a6f0-b525-4fa8-9ecb-010e11e4e7a3",
      muscleGroupId: getMuscleGroupId("Abs"),
      name: "Vácuo de estômago em pé",
      series: "4",
      repetitions: "60s",
      weight: "Corporal",
      restTime: "60",
      instructions:
        "Fique em pé e contraia o abdômen, puxando o umbigo em direção à coluna. Mantenha a contração pelo tempo determinado.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Abs/V%C3%A1cuo+de+est%C3%B4mago+em+p%C3%A9.png",
      videoUrl: "https://www.youtube.com/watch?v=AFthLwQ-9u0",
    },
    {
      id: "1deef787-c08d-4de8-bf3a-0622395ddeae",
      muscleGroupId: getMuscleGroupId("Adutores"),
      name: "Máquina de adução de quadril",
      series: "4",
      repetitions: "12",
      weight: "10",
      restTime: "60",
      instructions:
        "Sente-se na máquina com as costas apoiadas no encosto e os pés apoiados nos suportes. Aproxime as pernas lateralmente até a altura do quadril, contraindo os adutores. Retorne lentamente à posição inicial e repita o movimento.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Adutores/M%C3%A1quina+de+adu%C3%A7%C3%A3o+de+quadril.png",
      videoUrl: "https://www.youtube.com/watch?v=CJBUCR84ic0",
    },
    {
      id: "c21b1612-7559-4b42-94fc-c1a2cbcd4376",
      muscleGroupId: getMuscleGroupId("Adutores"),
      name: "Alongamento de sapo balançando",
      series: "4",
      repetitions: "60s",
      weight: "Corporal",
      restTime: "60",
      instructions:
        "Ajoelhe-se no chão com os joelhos afastados e os pés juntos. Apoie as mãos no chão e empurre o quadril para trás, mantendo a posição pelo tempo determinado.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Adutores/Alongamento+de+sapo+balan%C3%A7ando.png",
      videoUrl: "https://www.youtube.com/watch?v=X1xuLlDjh24",
    },
    {
      id: "7fcd8f36-25ba-49e7-acc5-977cd2f240c5",
      muscleGroupId: getMuscleGroupId("Adutores"),
      name: "Agachamento Profundo com Alavanca",
      series: "4",
      repetitions: "12",
      weight: "10",
      restTime: "60",
      instructions:
        "Apoie as mãos na alavanca e mantenha o corpo reto, contraindo os adutores. Realize o movimento de agachamento e retorne à posição inicial.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Adutores/Agachamento+Profundo+com+Alavanca.png",
      videoUrl: "https://www.youtube.com/watch?v=yV8ONhEyOp4",
    },
    {
      id: "d81d9561-12eb-4865-b024-2038c5460b50",
      muscleGroupId: getMuscleGroupId("Adutores"),
      name: "Afundo lateral alternado com alcance acima da cabeça",
      series: "4",
      repetitions: "12",
      weight: "Corporal",
      restTime: "60",
      instructions:
        "Dê um passo lateral e realize o movimento de afundo, contraindo os adutores. Retorne à posição inicial e repita o movimento do outro lado.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Adutores/Afundo+lateral+alternado+com+alcance+acima+da+cabe%C3%A7a.png",
      videoUrl: "https://www.youtube.com/watch?v=VOV1QGvluLA",
    },
    {
      id: "85008734-1e4a-4479-8b11-f7dce976fd7d",
      muscleGroupId: getMuscleGroupId("Adutores"),
      name: "Adução de quadril com cabo",
      series: "4",
      repetitions: "12",
      weight: "10",
      restTime: "60",
      instructions:
        "Fixe a tornozeleira no cabo baixo e posicione-se de lado para a máquina. Mantendo o tronco ereto, aproxime a perna lateralmente até a altura do quadril, contraindo os adutores. Retorne lentamente à posição inicial e repita o movimento.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Adutores/Adu%C3%A7%C3%A3o+de+quadril+com+cabo.png",
      videoUrl: "https://www.youtube.com/watch?v=jFnSxKMjt6s",
    },
    {
      id: "dc2270f0-7af3-4eb8-829b-481428726a60",
      muscleGroupId: getMuscleGroupId("Adutores"),
      name: "Rolamento de espuma adutor",
      series: "4",
      repetitions: "60s",
      weight: "Corporal",
      restTime: "60",
      instructions:
        "Sente-se no chão com as pernas estendidas e uma bola de espuma entre os joelhos. Role a bola de espuma para frente e para trás, contraindo os adutores.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Adutores/Rolamento+de+espuma+adutor.png",
      videoUrl: "https://www.youtube.com/watch?v=jKGW1TyeXqE",
    },
    {
      id: "1fb6f64e-2496-46cf-a4c8-73f83cfb6c0a",
      muscleGroupId: getMuscleGroupId("Adutores"),
      name: "Mobilização lateral do adutor ajoelhado",
      series: "4",
      repetitions: "60s",
      weight: "Corporal",
      restTime: "60",
      instructions:
        "Ajoelhe-se no chão com as pernas afastadas e as mãos apoiadas. Realize o movimento de inclinação lateral do tronco, contraindo os adutores.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Adutores/Mobiliza%C3%A7%C3%A3o+lateral+do+adutor+ajoelhado.png",
      videoUrl: "https://www.youtube.com/watch?v=Je5HbFt0hPQ",
    },
    {
      id: "ca875478-da7d-478c-9526-e57360c5762a",
      muscleGroupId: getMuscleGroupId("Biceps"),
      name: "Flexão de martelo em pé",
      series: "4",
      repetitions: "12",
      weight: "10",
      restTime: "60",
      instructions:
        "Segure um halter em cada mão com as palmas voltadas para o corpo. Flexione os cotovelos, contraindo os bíceps, e retorne lentamente à posição inicial.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Biceps/Flex%C3%A3o+de+martelo+em+p%C3%A9.png",
      videoUrl: "https://www.youtube.com/watch?v=jadLjlrgugY",
    },
    {
      id: "82c5f75e-76c5-4779-992c-6150db23ab7a",
      muscleGroupId: getMuscleGroupId("Biceps"),
      name: "Flexão de halteres em pé",
      series: "4",
      repetitions: "12",
      weight: "10",
      restTime: "60",
      instructions:
        "Segure um halter em cada mão com as palmas voltadas para a frente. Flexione os cotovelos, contraindo os bíceps, e retorne lentamente à posição inicial.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Biceps/Flex%C3%A3o+de+halteres+em+p%C3%A9.png",
      videoUrl: "https://www.youtube.com/watch?v=xmy-20z4FUw",
    },
    {
      id: "3e8058ca-01a7-4922-aa33-0871904c852f",
      muscleGroupId: getMuscleGroupId("Biceps"),
      name: "Flexão de halteres inclinada",
      series: "4",
      repetitions: "12",
      weight: "10",
      restTime: "60",
      instructions:
        "Sente-se em um banco inclinado com um halter em cada mão. Flexione os cotovelos, contraindo os bíceps, e retorne lentamente à posição inicial.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Biceps/Flex%C3%A3o+de+halteres+inclinada.png",
      videoUrl: "https://www.youtube.com/watch?v=-UdWrtGOb4U",
    },
    {
      id: "fc5d9947-5b28-45ed-9e90-c65b31ff3679",
      muscleGroupId: getMuscleGroupId("Biceps"),
      name: "Flexão de Barra em Pé",
      series: "4",
      repetitions: "12",
      weight: "10",
      restTime: "60",
      instructions:
        "Segure uma barra com as palmas voltadas para cima e os braços estendidos. Flexione os cotovelos, contraindo os bíceps, e retorne lentamente à posição inicial.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Biceps/Flex%C3%A3o+de+Barra+em+P%C3%A9.png",
      videoUrl: "https://www.youtube.com/watch?v=FYu3CgFlXh0",
    },
    {
      id: "7aae83b0-e6ba-4718-858e-5e267f26b979",
      muscleGroupId: getMuscleGroupId("Biceps"),
      name: "Rosca Direta no Polia.",
      series: "4",
      repetitions: "12",
      weight: "10",
      restTime: "60",
      instructions:
        "Ajoelhe-se de frente para a polia alta e segure a barra com as palmas voltadas para cima. Flexione os cotovelos, contraindo os bíceps, e retorne lentamente à posição inicial.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Biceps/Rosca+Direta+na+Polia.png",
      videoUrl: "https://www.youtube.com/watch?v=-G8ACUhjhKs",
    },
    {
      id: "3d6e6dd8-daaa-4a2a-97f6-2298d4b1cf8a",
      muscleGroupId: getMuscleGroupId("Biceps"),
      name: "Rosca Zottman",
      series: "4",
      repetitions: "12",
      weight: "10",
      restTime: "60",
      instructions:
        "Segure um halter em cada mão com as palmas voltadas para cima. Flexione os cotovelos, contraindo os bíceps, e retorne lentamente à posição inicial.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Biceps/Rosca+Zottman.png",
      videoUrl: "https://www.youtube.com/watch?v=RJJiKpW6MUA",
    },
    {
      id: "9d9aa766-5838-463e-8fec-58a65b4a3e67",
      muscleGroupId: getMuscleGroupId("Biceps"),
      name: "Rosca Scott com Barra EZ",
      series: "4",
      repetitions: "12",
      weight: "10",
      restTime: "60",
      instructions:
        "Sente-se no banco Scott com os braços estendidos e as mãos na barra EZ. Flexione os cotovelos, contraindo os bíceps, e retorne lentamente à posição inicial.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Biceps/Rosca+Scott+com+Barra+EZ..png",
      videoUrl: "https://www.youtube.com/watch?v=3C8DbtQE18U",
    },
    {
      id: "17381849-de6a-4755-9039-528931c12d91",
      muscleGroupId: getMuscleGroupId("Biceps"),
      name: "Rosca Concentrada",
      series: "4",
      repetitions: "12",
      weight: "10",
      restTime: "60",
      instructions:
        "Sente-se em um banco com um halter em uma das mãos. Apoie o cotovelo na parte interna da coxa e flexione o cotovelo, contraindo o bíceps. Retorne lentamente à posição inicial e repita o movimento.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Biceps/Rosca+Concentrada.png",
      videoUrl: "https://www.youtube.com/watch?v=EEpvOQAAtRo",
    },
    {
      id: "c4ccd21d-b94c-4eca-9928-6b4c58112eda",
      muscleGroupId: getMuscleGroupId("Biceps"),
      name: "Rosca Martelo Cruzada",
      series: "4",
      repetitions: "12",
      weight: "10",
      restTime: "60",
      instructions:
        "Segure um halter em cada mão com as palmas voltadas para o corpo. Flexione os cotovelos, contraindo os bíceps, e retorne lentamente à posição inicial.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Biceps/Rosca+Martelo+Cruzada.png",
      videoUrl: "https://www.youtube.com/watch?v=gmUwVdjaAcU",
    },
    {
      id: "7356455d-1052-4eee-a188-c4d21d26d640",
      muscleGroupId: getMuscleGroupId("Biceps"),
      name: "Rosca com Corda na Polia",
      series: "4",
      repetitions: "12",
      weight: "10",
      restTime: "60",
      instructions:
        "Segure a corda com as duas mãos e mantenha os cotovelos estendidos. Flexione os cotovelos, contraindo os bíceps, e retorne lentamente à posição inicial.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Biceps/Rosca+com+Corda+na+Polia.png",
      videoUrl: "https://www.youtube.com/watch?v=JQhYiIqJlHg",
    },
    {
      id: "069512a9-0bbf-4c09-b7c3-750be7730e88",
      muscleGroupId: getMuscleGroupId("Peitoral"),
      name: "Dumbbell Bench Press",
      series: "4",
      repetitions: "12",
      weight: "10",
      restTime: "60",
      instructions:
        "Deite-se em um banco com um halter em cada mão. Flexione os cotovelos, contraindo o peitoral, e retorne lentamente à posição inicial.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Peitoral/Dumbbell+Bench+Press.png",
      videoUrl: "https://www.youtube.com/watch?v=hm_TrCkhJgo",
    },
    {
      id: "f0b55d75-1a8d-4eb1-9fbb-4637ea6b779a",
      muscleGroupId: getMuscleGroupId("Peitoral"),
      name: "Dumbbell Pullover",
      series: "4",
      repetitions: "12",
      weight: "10",
      restTime: "60",
      instructions:
        "Deite-se em um banco com um halter em uma das mãos. Flexione os cotovelos, contraindo o peitoral, e retorne lentamente à posição inicial.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Peitoral/Dumbbell+Pullover.png",
      videoUrl: "https://www.youtube.com/watch?v=jQjWlIwG4sI",
    },
    {
      id: "61b88268-0fe2-404a-a8c5-1a6e775d84d8",
      muscleGroupId: getMuscleGroupId("Peitoral"),
      name: "Incline Dumbbell Bench Press",
      series: "4",
      repetitions: "12",
      weight: "10",
      restTime: "60",
      instructions:
        "Deite-se em um banco inclinado com um halter em cada mão. Flexione os cotovelos, contraindo o peitoral, e retorne lentamente à posição inicial.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Peitoral/Incline+Dumbbell+Bench+Press.png",
      videoUrl: "https://www.youtube.com/watch?v=5CECBjd7HLQ",
    },
    {
      id: "ff9db794-9c8e-422a-af74-01a33416c9ea",
      muscleGroupId: getMuscleGroupId("Peitoral"),
      name: "Dumbbell Flys",
      series: "4",
      repetitions: "12",
      weight: "10",
      restTime: "60",
      instructions:
        "Deite-se em um banco com um halter em cada mão. Flexione os cotovelos, contraindo o peitoral, e retorne lentamente à posição inicial.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Peitoral/Dumbbell+Flys.png",
      videoUrl: "https://www.youtube.com/watch?v=JFm8KbhjibM",
    },
    {
      id: "852d95cd-2868-4a0e-88ea-ce9d7effdf2e",
      muscleGroupId: getMuscleGroupId("Peitoral"),
      name: "Pec Deck",
      series: "4",
      repetitions: "12",
      weight: "10",
      restTime: "60",
      instructions:
        "Sente-se na máquina com as costas apoiadas no encosto e os cotovelos flexionados. Aproxime os braços lateralmente, contraindo o peitoral. Retorne lentamente à posição inicial e repita o movimento.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Peitoral/Pec+Deck.png",
      videoUrl: "https://www.youtube.com/watch?v=lSV3-8mlUnc",
    },
    {
      id: "6d4756d5-c8e6-48f4-919e-8b94c7ec5464",
      muscleGroupId: getMuscleGroupId("Peitoral"),
      name: "Incline Bench Press",
      series: "4",
      repetitions: "12",
      weight: "10",
      restTime: "60",
      instructions:
        "Deite-se em um banco inclinado com uma barra. Flexione os cotovelos, contraindo o peitoral, e retorne lentamente à posição inicial.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Peitoral/Incline+Bench+Press.png",
      videoUrl: "https://www.youtube.com/watch?v=lJ2o89kcnxY",
    },
    {
      id: "c025bbf2-b4ac-432a-87c8-dd6bf5d36266",
      muscleGroupId: getMuscleGroupId("Peitoral"),
      name: "Barbell Bench Press",
      series: "4",
      repetitions: "12",
      weight: "10",
      restTime: "60",
      instructions:
        "Deite-se em um banco com uma barra. Flexione os cotovelos, contraindo o peitoral, e retorne lentamente à posição inicial.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Peitoral/Barbell+Bench+Press.png",
      videoUrl: "https://www.youtube.com/watch?v=ejI1Nlsul9k",
    },
    {
      id: "2d3c57c2-d68a-4250-bc66-4c653a14bf75",
      muscleGroupId: getMuscleGroupId("Peitoral"),
      name: "Hammer Strength Bench Press",
      series: "4",
      repetitions: "12",
      weight: "10",
      restTime: "60",
      instructions:
        "Sente-se na máquina com as costas apoiadas no encosto e os cotovelos flexionados. Flexione os cotovelos, contraindo o peitoral, e retorne lentamente à posição inicial.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Peitoral/Hammer+Strength+Bench+Press.png",
      videoUrl: "https://www.youtube.com/watch?v=ZixOKUI3xt8",
    },
    {
      id: "981eac07-dba6-476b-bdb9-9e7f7e927cb7",
      muscleGroupId: getMuscleGroupId("Peitoral"),
      name: "Close Grip Dumbbell Press (AKA Crush Press)",
      series: "4",
      repetitions: "12",
      weight: "10",
      restTime: "60",
      instructions:
        "Deite-se em um banco com um halter em cada mão. Flexione os cotovelos, contraindo o peitoral, e retorne lentamente à posição inicial.",
      imageUrl:
        "https://workoutx-bucket.s3.us-east-2.amazonaws.com/exercises/Peitoral/Close+Grip+Dumbbell+Press+(AKA+Crush+Press).png",
      videoUrl: "https://www.youtube.com/watch?v=qcMyLSG_fAA",
    },
    // {
    //   id: "13e77372-6cc8-4128-95bb-ed69f8f7daf7",
    //   muscleGroupId: getMuscleGroupId("Peitoral"),
    //   name: "",
    //   series: "",
    //   repetitions: "",
    //   weight: "",
    //   restTime: "",
    //   instructions: "",
    //   imageUrl: "",
    //   videoUrl: ""
    // },
    // {
    //   id: "19d29c3f-1789-4c37-aec6-33eeec07fbda",
    //   muscleGroupId: getMuscleGroupId(""),
    //   name: "",
    //   series: "",
    //   repetitions: "",
    //   weight: "",
    //   restTime: "",
    //   instructions: "",
    //   imageUrl: "",
    //   videoUrl: ""
    // },
    // {
    //   id: "8148e29c-ba97-4155-93e7-1272582b7f06",
    //   muscleGroupId: getMuscleGroupId(""),
    //   name: "",
    //   series: "",
    //   repetitions: "",
    //   weight: "",
    //   restTime: "",
    //   instructions: "",
    //   imageUrl: "",
    //   videoUrl: ""
    // },
    // {
    //   id: "44a68b71-ed6d-40ea-96ec-d42f80aea6b5",
    //   muscleGroupId: getMuscleGroupId(""),
    //   name: "",
    //   series: "",
    //   repetitions: "",
    //   weight: "",
    //   restTime: "",
    //   instructions: "",
    //   imageUrl: "",
    //   videoUrl: ""
    // },
    // {
    //   id: "42ad7dbc-9306-4f56-b49b-1cc28315df55",
    //   muscleGroupId: getMuscleGroupId(""),
    //   name: "",
    //   series: "",
    //   repetitions: "",
    //   weight: "",
    //   restTime: "",
    //   instructions: "",
    //   imageUrl: "",
    //   videoUrl: ""
    // },
    // {
    //   id: "ac5eb3e0-7610-4fe7-b82b-dd8e0af28fb9",
    //   muscleGroupId: getMuscleGroupId(""),
    //   name: "",
    //   series: "",
    //   repetitions: "",
    //   weight: "",
    //   restTime: "",
    //   instructions: "",
    //   imageUrl: "",
    //   videoUrl: ""
    // },
    // {
    //   id: "98db74b6-3a5d-411a-931e-bbef41bd8888",
    //   muscleGroupId: getMuscleGroupId(""),
    //   name: "",
    //   series: "",
    //   repetitions: "",
    //   weight: "",
    //   restTime: "",
    //   instructions: "",
    //   imageUrl: "",
    //   videoUrl: ""
    // },
    // {
    //   id: "d0fb0246-0f9f-49f3-bf69-5fe8d958bc50",
    //   muscleGroupId: getMuscleGroupId(""),
    //   name: "",
    //   series: "",
    //   repetitions: "",
    //   weight: "",
    //   restTime: "",
    //   instructions: "",
    //   imageUrl: "",
    //   videoUrl: ""
    // },
    // {
    //   id: "03d47e23-105b-4dbd-befb-202be361d1f0",
    //   muscleGroupId: getMuscleGroupId(""),
    //   name: "",
    //   series: "",
    //   repetitions: "",
    //   weight: "",
    //   restTime: "",
    //   instructions: "",
    //   imageUrl: "",
    //   videoUrl: ""
    // },
    // {
    //   id: "30bda73c-4d56-4cc8-a4eb-706e674e9d96",
    //   muscleGroupId: getMuscleGroupId(""),
    //   name: "",
    //   series: "",
    //   repetitions: "",
    //   weight: "",
    //   restTime: "",
    //   instructions: "",
    //   imageUrl: "",
    //   videoUrl: ""
    // },
    // {
    //   id: "eb524894-de0f-4470-a32e-196fbc003d93",
    //   muscleGroupId: getMuscleGroupId(""),
    //   name: "",
    //   series: "",
    //   repetitions: "",
    //   weight: "",
    //   restTime: "",
    //   instructions: "",
    //   imageUrl: "",
    //   videoUrl: ""
    // },
    // {
    //   id: "563be79a-97d5-49f0-a584-f723f91ecd36",
    //   muscleGroupId: getMuscleGroupId(""),
    //   name: "",
    //   series: "",
    //   repetitions: "",
    //   weight: "",
    //   restTime: "",
    //   instructions: "",
    //   imageUrl: "",
    //   videoUrl: ""
    // },
    // {
    //   id: "e0814623-8ba6-42f6-939b-178fbf8a9c2f",
    //   muscleGroupId: getMuscleGroupId(""),
    //   name: "",
    //   series: "",
    //   repetitions: "",
    //   weight: "",
    //   restTime: "",
    //   instructions: "",
    //   imageUrl: "",
    //   videoUrl: ""
    // },
    // {
    //   id: "25097cd6-7da0-4f52-b702-a47c7070e410",
    //   muscleGroupId: getMuscleGroupId(""),
    //   name: "",
    //   series: "",
    //   repetitions: "",
    //   weight: "",
    //   restTime: "",
    //   instructions: "",
    //   imageUrl: "",
    //   videoUrl: ""
    // },
    // {
    //   id: "fd76ff55-fd3d-4b42-94a3-9c5ca61cbd2b",
    //   muscleGroupId: getMuscleGroupId(""),
    //   name: "",
    //   series: "",
    //   repetitions: "",
    //   weight: "",
    //   restTime: "",
    //   instructions: "",
    //   imageUrl: "",
    //   videoUrl: ""
    // },
    // {
    //   id: "38dc8e40-d32d-4647-93ba-70df4d99f645",
    //   muscleGroupId: getMuscleGroupId(""),
    //   name: "",
    //   series: "",
    //   repetitions: "",
    //   weight: "",
    //   restTime: "",
    //   instructions: "",
    //   imageUrl: "",
    //   videoUrl: ""
    // },
    // {
    //   id: "336eba54-275b-4bc7-9307-152a0341e7fa",
    //   muscleGroupId: getMuscleGroupId(""),
    //   name: "",
    //   series: "",
    //   repetitions: "",
    //   weight: "",
    //   restTime: "",
    //   instructions: "",
    //   imageUrl: "",
    //   videoUrl: ""
    // },
    // {
    //   id: "9c236f84-d10b-4d24-acf0-4e6ebfb46040",
    //   muscleGroupId: getMuscleGroupId(""),
    //   name: "",
    //   series: "",
    //   repetitions: "",
    //   weight: "",
    //   restTime: "",
    //   instructions: "",
    //   imageUrl: "",
    //   videoUrl: ""
    // },
    // {
    //   id: "7ab441fe-996a-4b50-881a-1d47cf725cd4",
    //   muscleGroupId: getMuscleGroupId(""),
    //   name: "",
    //   series: "",
    //   repetitions: "",
    //   weight: "",
    //   restTime: "",
    //   instructions: "",
    //   imageUrl: "",
    //   videoUrl: ""
    // },
  ];

  const workouts = [
    {
      userId: "user_2tYPPiwlmkzwFQftgQ49Y372EUM",
      name: "Treino A - Peito e Bíceps",
      visibility: "PRIVATE",
      exercises: [
        { id: "1fb6f64e-2496-46cf-a4c8-73f83cfb6c0a" },
        { id: "ca875478-da7d-478c-9526-e57360c5762a" },
        { id: "82c5f75e-76c5-4779-992c-6150db23ab7a" },
        { id: "3e8058ca-01a7-4922-aa33-0871904c852f" },
        { id: "fc5d9947-5b28-45ed-9e90-c65b31ff3679" },
        { id: "7aae83b0-e6ba-4718-858e-5e267f26b979" },
        { id: "3d6e6dd8-daaa-4a2a-97f6-2298d4b1cf8a" },
        { id: "9d9aa766-5838-463e-8fec-58a65b4a3e67" },
        { id: "17381849-de6a-4755-9039-528931c12d91" },
      ],
    },
  ];

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

  let exercisesData = []
  for (const exercise of exercises) {
    await prisma.exercise.create({
      data: {
        id: exercise.id,
        muscleGroupId: exercise.muscleGroupId,
        name: exercise.name,
        series: exercise.series,
        repetitions: exercise.repetitions,
        weight: exercise.weight,
        restTime: exercise.restTime,
        instructions: exercise.instructions,
        imageUrl: exercise.imageUrl,
        videoUrl: exercise.videoUrl,
      },
    });
  }

  for (const workoutData of workouts) {
    await prisma.workout.create({
      data: {
        userId: workoutData.userId,
        name: workoutData.name,
        visibility: workoutData.visibility,
        exercises: {
          connect: workoutData.exercises.map((exercise) => {
            return { id: exercise.id };
          }),
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
