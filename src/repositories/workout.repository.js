import { prisma } from "../libs/prisma.js";

const logError = (error) => {
  console.error("Database Error:", error);
  throw new Error("An unexpected error occurred. Please try again.");
};

const getUserById = async (userId) => {
  try {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        avatar: true,
      },
    });
  } catch (error) {
    logError(error);
  }
};

const getExercisesByIds = async (exerciseIds) => {
  try {
    return await prisma.exercise.findMany({
      where: {
        id: {
          in: exerciseIds,
        },
      },
      select: {
        id: true,
        name: true,
      },
    });
  } catch (error) {
    logError(error);
  }
};

const createWorkout = async (userId, name, privacy, exercises, description) => {
  try {
    return await prisma.workout.create({
      data: {
        userId,
        name,
        description,
        visibility: privacy,
        WorkoutExercises: {
          create: exercises.map((exercise) => ({
            exerciseId: exercise.id,
            series: exercise.series.toString(),
            repetitions: exercise.repetitions.toString(),
            weight: exercise.weight.toString(),
            restTime: exercise.rest.toString(),
          })),
        },
      },
      select: {
        id: true,
        userId: true,
        name: true,
        description: true,
        visibility: true,
        createdAt: true,
        updatedAt: true,
        WorkoutExercises: {
          select: {
            id: true,
            series: true,
            repetitions: true,
            weight: true,
            restTime: true,
            exercise: {
              select: {
                id: true,
                name: true,
                image: true,
                videoUrl: true,
                description: true,
                muscleGroup: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  } catch (error) {
    logError(error);
  }
};

const getWorkoutsByUserId = async (userId) => {
  try {
    return await prisma.workout.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        userId: true,
        name: true,
        description: true,
        visibility: true,
        createdAt: true,
        updatedAt: true,
        WorkoutExercises: {
          select: {
            id: true,
            series: true,
            repetitions: true,
            weight: true,
            restTime: true,
            exercise: {
              select: {
                id: true,
                name: true,
                image: true,
                videoUrl: true,
                description: true,
                muscleGroup: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
          orderBy: {
            exercise: {
              name: 'asc',
            },
          },
        },
        WorkoutSessions: {
          where: {
            status: "IN_PROGRESS"
          },
          select: {
            id: true,
            status: true,
            startedAt: true,
            endedAt: true,
            createdAt: true,
            updatedAt: true,
               WorkoutSessionExercises: {
                 select: {
                   id: true,
                   status: true,
                   series: true,
                   repetitions: true,
                   weight: true,
                   restTime: true,
                   createdAt: true,
                   updatedAt: true,
                   workoutExercise: {
                  select: {
                    id: true,
                    series: true,
                    repetitions: true,
                    weight: true,
                    restTime: true,
                    exercise: {
                      select: {
                        id: true,
                        name: true,
                        image: true,
                        videoUrl: true,
                        description: true,
                        muscleGroup: {
                          select: {
                            id: true,
                            name: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
              orderBy: {
                workoutExercise: {
                  exercise: {
                    name: 'asc',
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  } catch (error) {
    logError(error);
  }
};

const getWorkoutById = async (workoutId) => {
  try {
    return await prisma.workout.findUnique({
      where: {
        id: workoutId,
      },
      select: {
        id: true,
        userId: true,
        name: true,
        description: true,
        visibility: true,
        createdAt: true,
        updatedAt: true,
        WorkoutExercises: {
          select: {
            id: true,
            series: true,
            repetitions: true,
            weight: true,
            restTime: true,
            exercise: {
              select: {
                id: true,
                name: true,
                image: true,
                videoUrl: true,
                description: true,
                muscleGroup: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
          orderBy: {
            exercise: {
              name: 'asc',
            },
          },
        },
      },
    });
  } catch (error) {
    logError(error);
  }
};

const getWorkoutSessionInProgressByWorkoutId = async (workoutId) => {
  try {
    return await prisma.workoutSession.findFirst({
      where: {
        workoutId: workoutId,
        status: "IN_PROGRESS",
      },
      select: {
        id: true,
        userId: true,
        workoutId: true,
        status: true,
        startedAt: true,
        endedAt: true,
        createdAt: true,
        updatedAt: true,
        workout: {
          select: {
            id: true,
            userId: true,
            name: true,
            visibility: true,
            createdAt: true,
            updatedAt: true,
            WorkoutExercises: {
              select: {
                id: true,
                series: true,
                repetitions: true,
                weight: true,
                restTime: true,
                exercise: {
                  select: {
                    id: true,
                    name: true,
                    image: true,
                    videoUrl: true,
                    description: true,
                    muscleGroup: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              },
              orderBy: {
                exercise: {
                  name: 'asc',
                },
              },
            },
          },
        },
               WorkoutSessionExercises: {
                 select: {
                   id: true,
                   status: true,
                   series: true,
                   repetitions: true,
                   weight: true,
                   restTime: true,
                   createdAt: true,
                   updatedAt: true,
                   workoutExercise: {
              select: {
                id: true,
                series: true,
                repetitions: true,
                weight: true,
                restTime: true,
                exercise: {
                  select: {
                    id: true,
                    name: true,
                    image: true,
                    videoUrl: true,
                    description: true,
                    muscleGroup: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
          orderBy: {
            workoutExercise: {
              exercise: {
                name: 'asc',
              },
            },
          },
        },
      },
    });
  } catch (error) {
    logError(error);
  }
};

const getWorkoutInProgressByUserId = async (userId) => {
  try {
    return await prisma.workout.findFirst({
      where: {
        userId: userId,
        status: "IN_PROGRESS",
      },
      select: {
        id: true,
        name: true,
      },
    });
  } catch (error) {
    logError(error);
  }
};


const updateWorkoutStatus = async (workoutId, status) => {
  try {
    return await prisma.workout.update({
      where: {
        id: workoutId,
      },
      data: {
        status: status,
      },
      select: {
        id: true,
        userId: true,
        name: true,
        visibility: true,
        createdAt: true,
        updatedAt: true,
        WorkoutExercises: {
          select: {
            id: true,
            series: true,
            repetitions: true,
            weight: true,
            restTime: true,
            exercise: {
              select: {
                id: true,
                name: true,
                image: true,
                videoUrl: true,
                description: true,
                muscleGroup: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
          orderBy: {
            exercise: {
              name: 'asc',
            },
          },
        },
      },
    });
  } catch (error) {
    logError(error);
  }
};

const completeWorkout = async (workoutId, workoutStatus) => {
  try {
    return await prisma.$transaction(async (tx) => {
      // Atualizar exercícios não completados para UNCOMPLETED
      await tx.workoutExercises.updateMany({
        where: {
          workoutId: workoutId,
          status: {
            not: "COMPLETED",
          },
        },
        data: {
          status: "UNCOMPLETED",
        },
      });

      // Atualizar o treino com o status apropriado (COMPLETED ou UNCOMPLETED)
      return await tx.workout.update({
        where: {
          id: workoutId,
        },
        data: {
          status: workoutStatus,
        },
        select: {
          id: true,
          userId: true,
          name: true,
          visibility: true,
          createdAt: true,
          updatedAt: true,
          WorkoutExercises: {
            select: {
              id: true,
              series: true,
              repetitions: true,
              weight: true,
              restTime: true,
              exercise: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                  videoUrl: true,
                  description: true,
                  muscleGroup: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
            },
            orderBy: {
              exercise: {
                name: 'asc',
              },
            },
          },
        },
      });
    });
  } catch (error) {
    logError(error);
  }
};

const stopWorkout = async (workoutId) => {
  try {
    return await prisma.$transaction(async (tx) => {
      // Voltar todos os exercícios para NOT_STARTED
      await tx.workoutExercises.updateMany({
        where: {
          workoutId: workoutId,
        },
        data: {
          status: "NOT_STARTED",
        },
      });

      // Voltar o treino para NOT_STARTED
      return await tx.workout.update({
        where: {
          id: workoutId,
        },
        data: {
          status: "NOT_STARTED",
        },
        select: {
          id: true,
          userId: true,
          name: true,
          visibility: true,
          createdAt: true,
          updatedAt: true,
          WorkoutExercises: {
            select: {
              id: true,
              series: true,
              repetitions: true,
              weight: true,
              restTime: true,
              exercise: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                  videoUrl: true,
                  description: true,
                  muscleGroup: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
            },
            orderBy: {
              exercise: {
                name: 'asc',
              },
            },
          },
        },
      });
    });
  } catch (error) {
    logError(error);
  }
};

// WorkoutSession functions
const createWorkoutSession = async (userId, workoutId) => {
  try {
    return await prisma.$transaction(async (tx) => {
      // Criar a sessão do treino
      const workoutSession = await tx.workoutSession.create({
        data: {
          userId,
          workoutId,
          status: "IN_PROGRESS",
        },
        select: {
          id: true,
          userId: true,
          workoutId: true,
          status: true,
          startedAt: true,
          endedAt: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      // Buscar os exercícios do treino
      const workoutExercises = await tx.workoutExercises.findMany({
        where: {
          workoutId: workoutId,
        },
        select: {
          id: true,
          series: true,
          repetitions: true,
          weight: true,
          restTime: true,
        },
      });

      // Criar os exercícios da sessão
      await tx.workoutSessionExercises.createMany({
        data: workoutExercises.map((exercise) => ({
          workoutSessionId: workoutSession.id,
          workoutExerciseId: exercise.id,
          status: "NOT_STARTED",
          series: exercise.series,
          repetitions: exercise.repetitions,
          weight: exercise.weight,
          restTime: exercise.restTime,
        })),
      });

      return workoutSession;
    });
  } catch (error) {
    logError(error);
  }
};

const getWorkoutSessionInProgressByUserId = async (userId) => {
  try {
    return await prisma.workoutSession.findFirst({
      where: {
        userId: userId,
        status: "IN_PROGRESS",
      },
      select: {
        id: true,
        userId: true,
        workoutId: true,
        status: true,
        startedAt: true,
        endedAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  } catch (error) {
    logError(error);
  }
};

const getWorkoutSessionById = async (sessionId) => {
  try {
    return await prisma.workoutSession.findUnique({
      where: {
        id: sessionId,
      },
      select: {
        id: true,
        userId: true,
        workoutId: true,
        status: true,
        startedAt: true,
        endedAt: true,
        createdAt: true,
        updatedAt: true,
        workout: {
          select: {
            id: true,
            userId: true,
            name: true,
            visibility: true,
            createdAt: true,
            updatedAt: true,
            WorkoutExercises: {
              select: {
                id: true,
                series: true,
                repetitions: true,
                weight: true,
                restTime: true,
                exercise: {
                  select: {
                    id: true,
                    name: true,
                    image: true,
                    videoUrl: true,
                    description: true,
                    muscleGroup: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              },
              orderBy: {
                exercise: {
                  name: 'asc',
                },
              },
            },
          },
        },
        WorkoutSessionExercises: {
          select: {
            id: true,
            status: true,
            workoutExercise: {
              select: {
                id: true,
                series: true,
                repetitions: true,
                weight: true,
                restTime: true,
                exercise: {
                  select: {
                    id: true,
                    name: true,
                    image: true,
                    videoUrl: true,
                    description: true,
                    muscleGroup: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
          orderBy: {
            workoutExercise: {
              exercise: {
                name: 'asc',
              },
            },
          },
        },
      },
    });
  } catch (error) {
    logError(error);
  }
};

const completeWorkoutSession = async (sessionId, observation) => {
  try {
    return await prisma.$transaction(async (tx) => {
      // Buscar a sessão com os exercícios
      const session = await tx.workoutSession.findUnique({
        where: { id: sessionId },
        include: {
          WorkoutSessionExercises: true,
        },
      });

      if (!session) {
        throw new Error("Sessão não encontrada");
      }

      // Verificar se todos os exercícios estão completados
      const allCompleted = session.WorkoutSessionExercises.every(
        (exercise) => exercise.status === "COMPLETED"
      );

      const workoutStatus = allCompleted ? "COMPLETED" : "UNCOMPLETED";

      // Atualizar exercícios não completados para UNCOMPLETED
      await tx.workoutSessionExercises.updateMany({
        where: {
          workoutSessionId: sessionId,
          status: {
            not: "COMPLETED",
          },
        },
        data: {
          status: "UNCOMPLETED",
        },
      });

      // Atualizar status da sessão com observação
      return await tx.workoutSession.update({
        where: {
          id: sessionId,
        },
        data: {
          status: workoutStatus,
          endedAt: new Date(),
          observation: observation,
        },
        select: {
          id: true,
          userId: true,
          workoutId: true,
          status: true,
          startedAt: true,
          endedAt: true,
          observation: true,
          createdAt: true,
          updatedAt: true,
          workout: {
            select: {
              id: true,
              userId: true,
              name: true,
              visibility: true,
              createdAt: true,
              updatedAt: true,
              WorkoutExercises: {
                select: {
                  id: true,
                  series: true,
                  repetitions: true,
                  weight: true,
                  restTime: true,
                  exercise: {
                    select: {
                      id: true,
                      name: true,
                      image: true,
                      videoUrl: true,
                      description: true,
                      muscleGroup: {
                        select: {
                          id: true,
                          name: true,
                        },
                      },
                    },
                  },
                },
                orderBy: {
                  exercise: {
                    name: 'asc',
                  },
                },
              },
            },
          },
          WorkoutSessionExercises: {
            select: {
              id: true,
              status: true,
              workoutExercise: {
                select: {
                  id: true,
                  series: true,
                  repetitions: true,
                  weight: true,
                  restTime: true,
                  exercise: {
                    select: {
                      id: true,
                      name: true,
                      image: true,
                      videoUrl: true,
                      description: true,
                      muscleGroup: {
                        select: {
                          id: true,
                          name: true,
                        },
                      },
                    },
                  },
                },
              },
            },
            orderBy: {
              workoutExercise: {
                exercise: {
                  name: 'asc',
                },
              },
            },
          },
        },
      });
    });
  } catch (error) {
    logError(error);
  }
};

const deleteWorkoutSession = async (sessionId) => {
  try {
    return await prisma.workoutSession.delete({
      where: {
        id: sessionId,
      },
    });
  } catch (error) {
    logError(error);
  }
};

const completeWorkoutSessionExercise = async (sessionExerciseId, exerciseData) => {
  try {
    return await prisma.workoutSessionExercises.update({
      where: {
        id: sessionExerciseId,
      },
      data: {
        status: "COMPLETED",
        series: exerciseData.series,
        repetitions: exerciseData.repetitions,
        weight: exerciseData.weight,
        restTime: exerciseData.restTime,
      },
      select: {
        id: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        workoutSession: {
          select: {
            id: true,
            userId: true,
            workoutId: true,
            status: true,
            startedAt: true,
            endedAt: true,
            createdAt: true,
            updatedAt: true,
            workout: {
              select: {
                id: true,
                userId: true,
                name: true,
                visibility: true,
                createdAt: true,
                updatedAt: true,
                WorkoutExercises: {
                  select: {
                    id: true,
                    series: true,
                    repetitions: true,
                    weight: true,
                    restTime: true,
                    exercise: {
                      select: {
                        id: true,
                        name: true,
                        image: true,
                        videoUrl: true,
                        description: true,
                        muscleGroup: {
                          select: {
                            id: true,
                            name: true,
                          },
                        },
                      },
                    },
                  },
                  orderBy: {
                    exercise: {
                      name: 'asc',
                    },
                  },
                },
              },
            },
               WorkoutSessionExercises: {
                 select: {
                   id: true,
                   status: true,
                   series: true,
                   repetitions: true,
                   weight: true,
                   restTime: true,
                   createdAt: true,
                   updatedAt: true,
                   workoutExercise: {
                  select: {
                    id: true,
                    series: true,
                    repetitions: true,
                    weight: true,
                    restTime: true,
                    exercise: {
                      select: {
                        id: true,
                        name: true,
                        image: true,
                        videoUrl: true,
                        description: true,
                        muscleGroup: {
                          select: {
                            id: true,
                            name: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
              orderBy: {
                workoutExercise: {
                  exercise: {
                    name: 'asc',
                  },
                },
              },
            },
          },
        },
        workoutExercise: {
          select: {
            id: true,
            series: true,
            repetitions: true,
            weight: true,
            restTime: true,
            exercise: {
              select: {
                id: true,
                name: true,
                image: true,
                videoUrl: true,
                description: true,
                muscleGroup: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  } catch (error) {
    logError(error);
  }
};

const getWorkoutHistory = async (userId, filters = {}) => {
  try {
    const {
      workoutName,
      status,
      startDate,
      endDate
    } = filters;

    // Construir filtros para a query
    const whereClause = {
      userId: userId,
    };

    // Filtro por nome do treino
    if (workoutName) {
      whereClause.workout = {
        name: {
          contains: workoutName,
          mode: 'insensitive'
        }
      };
    }

    // Filtro por status
    if (status) {
      whereClause.status = status;
    }

    // Filtro por data de início
    if (startDate || endDate) {
      whereClause.startedAt = {};
      if (startDate) {
        whereClause.startedAt.gte = new Date(startDate);
      }
      if (endDate) {
        whereClause.startedAt.lte = new Date(endDate);
      }
    }

    const sessions = await prisma.workoutSession.findMany({
      where: whereClause,
      include: {
        workout: {
          select: {
            id: true,
            name: true,
            visibility: true,
            createdAt: true,
            updatedAt: true,
          }
        },
        WorkoutSessionExercises: {
          include: {
            workoutExercise: {
              include: {
                exercise: {
                  select: {
                    id: true,
                    name: true,
                    image: true,
                    videoUrl: true,
                    description: true,
                    muscleGroup: {
                      select: {
                        id: true,
                        name: true,
                        image: true,
                        description: true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      orderBy: {
        startedAt: 'desc'
      }
    });

    return sessions;
  } catch (error) {
    logError(error);
    throw error;
  }
};

// Dashboard helpers
const getWorkoutSessionsByUserBetween = async (userId, startDate, endDate) => {
  try {
    return await prisma.workoutSession.findMany({
      where: {
        userId,
        startedAt: {
          gte: startDate,
          lt: endDate,
        },
      },
      select: {
        id: true,
        status: true,
        startedAt: true,
        endedAt: true,
      },
      orderBy: { startedAt: 'asc' },
    });
  } catch (error) {
    logError(error);
  }
};

const getLastWorkoutSessionsByUser = async (userId, limit = 5) => {
  try {
    return await prisma.workoutSession.findMany({
      where: { userId },
      include: {
        workout: {
          select: {
            id: true,
            name: true,
          }
        },
        WorkoutSessionExercises: {
          select: { id: true },
        }
      },
      orderBy: { startedAt: 'desc' },
      take: limit,
    });
  } catch (error) {
    logError(error);
  }
};

const getWeeklyExerciseVolume = async (userId, startOfWeek, endOfWeek) => {
  try {
    const sessions = await prisma.workoutSession.findMany({
      where: {
        userId,
        status: 'COMPLETED',
        startedAt: {
          gte: startOfWeek,
          lte: endOfWeek,
        },
      },
      select: {
        startedAt: true,
        WorkoutSessionExercises: {
          select: {
            id: true,
            status: true,
            workoutExercise: {
              select: {
                id: true,
                exercise: { select: { id: true } },
              },
            },
          },
        },
      },
    });

    // Agrupar por dia da semana (0 = domingo, 1 = segunda, etc.)
    const weeklyData = {
      sunday: 0,
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      saturday: 0,
    };

    sessions.forEach(session => {
      const dayOfWeek = session.startedAt.getDay();
      const exerciseCount = session.WorkoutSessionExercises.filter(e => e.status === 'COMPLETED').length;
      
      switch (dayOfWeek) {
        case 0: weeklyData.sunday += exerciseCount; break;
        case 1: weeklyData.monday += exerciseCount; break;
        case 2: weeklyData.tuesday += exerciseCount; break;
        case 3: weeklyData.wednesday += exerciseCount; break;
        case 4: weeklyData.thursday += exerciseCount; break;
        case 5: weeklyData.friday += exerciseCount; break;
        case 6: weeklyData.saturday += exerciseCount; break;
      }
    });

    return weeklyData;
  } catch (error) {
    logError(error);
    throw error;
  }
};

const getTopExercises = async (userId, limit = 10) => {
  try {
    // Contar diretamente a partir de WorkoutSessionExercises (apenas COMPLETED)
    const sessionExercises = await prisma.workoutSessionExercises.findMany({
      where: {
        status: 'COMPLETED',
        workoutSession: {
          userId,
          status: 'COMPLETED',
        },
      },
      select: {
        workoutExercise: {
          select: {
            exercise: { select: { id: true, name: true } },
          },
        },
      },
    });

    if (sessionExercises.length === 0) return [];

    const countByExerciseId = new Map();
    const nameByExerciseId = new Map();

    for (const se of sessionExercises) {
      const ex = se.workoutExercise.exercise;
      if (!ex) continue;
      const exId = ex.id;
      nameByExerciseId.set(exId, ex.name);
      countByExerciseId.set(exId, (countByExerciseId.get(exId) || 0) + 1);
    }

    const list = Array.from(countByExerciseId.entries()).map(([exerciseId, count]) => ({
      name: nameByExerciseId.get(exerciseId) || 'Exercício não encontrado',
      count,
    }));

    // Ordenar por count desc e limitar
    list.sort((a, b) => b.count - a.count);
    return list.slice(0, limit);
  } catch (error) {
    logError(error);
    throw error;
  }
};

// Community
const getPublicWorkouts = async ({ muscleGroupId, orderBy, userId, name } = {}) => {
  try {
    // Construir where
    const whereClause = {
      visibility: 'PUBLIC',
    };

    // Filtrar por nome do treino
    if (name) {
      whereClause.name = {
        contains: name,
        mode: 'insensitive',
      };
    }

    // Filtrar por grupo muscular via relação WorkoutExercises -> Exercise
    if (muscleGroupId) {
      whereClause.WorkoutExercises = {
        some: {
          exercise: {
            muscleGroupId: muscleGroupId,
          },
        },
      };
    }

    // Ordenação
    // 'most_liked' (mais curtido), 'most_recent' (mais recente - default)
    let orderByClause = [{ createdAt: 'desc' }];
    if (orderBy === 'most_liked') {
      orderByClause = [
        { WorkoutLikes: { _count: 'desc' } },
        { createdAt: 'desc' },
      ];
    } else if (orderBy === 'most_recent') {
      orderByClause = [{ createdAt: 'desc' }];
    }

    return await prisma.workout.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        user: { select: { id: true, name: true, avatar: true } },
        WorkoutExercises: {
          select: {
            id: true,
            series: true,
            repetitions: true,
            weight: true,
            restTime: true,
            exercise: {
              select: {
                id: true,
                name: true,
                image: true,
                videoUrl: true,
                description: true,
                muscleGroup: { select: { id: true, name: true } },
              },
            },
          },
          orderBy: {
            exercise: { name: 'asc' },
          },
        },
        _count: { select: { WorkoutLikes: true } },
        WorkoutLikes: userId ? {
          where: { userId },
          select: { id: true },
        } : false,
      },
      orderBy: orderByClause,
    });
  } catch (error) {
    logError(error);
  }
};

// Like helpers
const likeWorkout = async (userId, workoutId) => {
  try {
    return await prisma.workoutLike.create({
      data: { userId, workoutId },
      select: { id: true },
    });
  } catch (error) {
    logError(error);
  }
};

const unlikeWorkout = async (userId, workoutId) => {
  try {
    return await prisma.workoutLike.delete({
      where: { userId_workoutId: { userId, workoutId } },
    });
  } catch (error) {
    logError(error);
  }
};

const isWorkoutLikedByUser = async (userId, workoutId) => {
  try {
    const like = await prisma.workoutLike.findUnique({
      where: { userId_workoutId: { userId, workoutId } },
      select: { id: true },
    });
    return !!like;
  } catch (error) {
    logError(error);
  }
};

const countWorkoutLikes = async (workoutId) => {
  try {
    return await prisma.workoutLike.count({ where: { workoutId } });
  } catch (error) {
    logError(error);
  }
};

// Delete workout helpers
const canDeleteWorkout = async (workoutId) => {
  try {
    const [exerciseCount, sessionCount] = await Promise.all([
      prisma.workoutExercises.count({ where: { workoutId } }),
      prisma.workoutSession.count({ where: { workoutId } }),
    ]);
    return { hasExercises: exerciseCount > 0, hasSessions: sessionCount > 0 };
  } catch (error) {
    logError(error);
  }
};

const deleteWorkout = async (workoutId) => {
  try {
    return await prisma.workout.delete({ where: { id: workoutId } });
  } catch (error) {
    logError(error);
  }
};

const updateWorkout = async (workoutId, name, description, privacy, exercises) => {
  try {
    return await prisma.$transaction(async (tx) => {
      // Deletar exercícios existentes
      await tx.workoutExercises.deleteMany({
        where: { workoutId }
      });

      // Atualizar o treino
      const updatedWorkout = await tx.workout.update({
        where: { id: workoutId },
        data: {
          name,
          description,
          visibility: privacy,
          WorkoutExercises: {
            create: exercises.map((exercise) => ({
              exerciseId: exercise.id,
              series: exercise.series.toString(),
              repetitions: exercise.repetitions.toString(),
              weight: exercise.weight.toString(),
              restTime: exercise.rest.toString(),
            })),
          },
        },
        select: {
          id: true,
          userId: true,
          name: true,
          description: true,
          visibility: true,
          createdAt: true,
          updatedAt: true,
          WorkoutExercises: {
            select: {
              id: true,
              series: true,
              repetitions: true,
              weight: true,
              restTime: true,
              exercise: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                  videoUrl: true,
                  description: true,
                  muscleGroup: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      return updatedWorkout;
    });
  } catch (error) {
    logError(error);
  }
};

export default {
  getUserById,
  getExercisesByIds,
  createWorkout,
  getWorkoutsByUserId,
  getWorkoutById,
  getWorkoutInProgressByUserId,
  updateWorkoutStatus,
  completeWorkout,
  stopWorkout,
  createWorkoutSession,
  getWorkoutSessionInProgressByUserId,
  getWorkoutSessionById,
  completeWorkoutSession,
  deleteWorkoutSession,
  getWorkoutSessionInProgressByWorkoutId,
  completeWorkoutSessionExercise,
  getWorkoutHistory,
  getWorkoutSessionsByUserBetween,
  getLastWorkoutSessionsByUser,
  getWeeklyExerciseVolume,
  getTopExercises,
  getPublicWorkouts,
  canDeleteWorkout,
  deleteWorkout,
  updateWorkout,
  likeWorkout,
  unlikeWorkout,
  isWorkoutLikedByUser,
  countWorkoutLikes,
};
