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

const createWorkout = async (userId, name, privacy, exercises) => {
  try {
    return await prisma.workout.create({
      data: {
        userId,
        name,
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
};
