// dummyData.js
export const projects = [
    {
      Name: 'Project A',
      Percentage_Complete: 30,
      Team: ['John', 'Alice'],
      Due_Date: '2023-12-01',
      Tasks: ['TaskA', 'TaskB'],
    },

    
    {
      Name: 'Project B',
      Percentage_Complete: 70,
      Team: ['Bob', 'Charlie', 'Alice'],
      Due_Date: '2023-12-15',
      Tasks: ['TaskB'],
    },
    {
      Name: 'Project C',
      Percentage_Complete: 50,
      Team: ['John', 'Charlie'],
      Due_Date: '2023-11-30',
      Tasks: ['TaskA', 'TaskC'],
    },
    {
        Name: 'Project C',
        Percentage_Complete: 100,
        Team: ['John', 'Charlie'],
        Due_Date: '2023-11-30',
        Tasks: ['TaskA', 'TaskC'],
      },
  ];
  
  export const users = [
    {
      Name: 'John Doe',
      Tasks: ['TaskA', 'TaskC'],
      Projects: ['Project A', 'Project C'],
    },
    {
      Name: 'Alice Smith',
      Tasks: ['TaskA', 'TaskB'],
      Projects: ['Project A', 'Project B'],
    },
    {
      Name: 'Bob Johnson',
      Tasks: ['TaskB'],
      Projects: ['Project B'],
    },
    {
      Name: 'Charlie Brown',
      Tasks: ['TaskB', 'TaskC'],
      Projects: ['Project B', 'Project C'],
    },
  ];
  
  export const tasks = [
    {
      TaskName: 'TaskA',
      Complete: true,
      Phase: 'Implementation',
    },
    {
      TaskName: 'TaskB',
      Complete: false,
      Phase: 'Testing',
    },
    {
      TaskName: 'TaskC',
      Complete: true,
      Phase: 'Implementation',
    },
  ];
  