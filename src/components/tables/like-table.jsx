import { Table } from '@mantine/core';

const LikeTable = () => {
    const elements = [
        { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
        { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
        { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
        { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
        { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
      ];

    const ths = (
        <tr>
          <th>Action</th>
          <th>Element name</th>
          <th>Symbol</th>
          <th>Atomic mass</th>
        </tr>
      );
    
    const rows = elements.map((element) => (
    <tr key={element.name}>
        <td>{element.position}</td>
        <td>{element.name}</td>
        <td>{element.symbol}</td>
        <td>{element.mass}</td>
    </tr>
    ));

  return (
    <Table highlightOnHover>
      <thead>{ths}</thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

export default LikeTable;