import { prisma } from "../src/libs/prisma.js";

async function main() {
  const workouts = [
    {
      userId: "user_2tYqBz9P9Myh8aYjhbYr3llsxB5",
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
      userId: "user_2tYqBz9P9Myh8aYjhbYr3llsxB5",
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
      userId: "user_2tYqBz9P9Myh8aYjhbYr3llsxB5",
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
      userId: "user_2tYqBz9P9Myh8aYjhbYr3llsxB5",
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
      userId: "user_2tYqBz9P9Myh8aYjhbYr3llsxB5",
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

  await prisma.user.create({
    data: {
      avatar:
        "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ydFlxQnU4cTJ1WkNsdXZTRjhUQjl0OUxSY2IifQ",
      experience: "ATHLETE",
      goal: "COMPETITION",
      height: 175,
      id: "user_2tYqBz9P9Myh8aYjhbYr3llsxB5",
      name: "WorkoutX",
      publicProfile: true,
      weight: 90,
    },
  });

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
