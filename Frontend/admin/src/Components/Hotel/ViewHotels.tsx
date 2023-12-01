import React, { useState } from 'react';

const DataTable: React.FC = () => {
  const [reverse, setReverse] = useState<boolean>(false);
  const [sortByType, setSortByType] = useState<boolean>(false);

  // Add your sorting logic here if needed

  return (
    <div className="datatable container467">
      <input type="checkbox" id="reverse" checked={reverse} onChange={() => setReverse(!reverse)} />
      <input type="checkbox" id="type" checked={sortByType} onChange={() => setSortByType(!sortByType)} />

      <h2>Users</h2>

      <div className="row head">
        <div>Sorting:</div>
        <div className="reverse">
          <label htmlFor="reverse">Reversed</label>
        </div>
        <div className="type">
          <label htmlFor="type">By type</label>
        </div>
      </div>

      <div className="content">
        <div className="row science">
          <div>Bruce Banner</div>
          <div>Actif</div>
          <div>
            <p>Scientifique</p>
          </div>
        </div>
        <div className="row spy">
          <div>Natasha Romanoff</div>
          <div>Actif</div>
          <div>
            <p>Espion</p>
          </div>
        </div>
        <div className="row science">
          <div>Stephen Strange</div>
          <div>Actif</div>
          <div>
            <p>Scientifique</p>
          </div>
        </div>
        <div className="row soldier">
          <div>Steven Rogers</div>
          <div>Inactif</div>
          <div>
            <p>Soldat</p>
          </div>
        </div>
        <div className="row science">
          <div>Tony Stark</div>
          <div>Inactif</div>
          <div>
            <p>Scientifique</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
