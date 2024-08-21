## Tables

### PoP (Point of Presence)

| Column     | Type      | Details                      |
|------------|-----------|------------------------------|
| id         | UUID      | primary key                   |
| name       | string    | not null, unique              |
| city       | string    | not null                      |
| country    | string    | not null                      |
| status     | string    | not null                      |
| created_at | timestamp | default=current timestamp     |
| updated_at | timestamp | default=current timestamp     |

**Relationships:**
- **Has many** `Physical DC`

---

### Physical DC (Data Center)

| Column        | Type      | Details                      |
|---------------|-----------|------------------------------|
| id            | UUID      | primary key                   |
| name          | string    | not null, unique              |
| provider_name | string    | not null                      |
| location      | string    | not null                      |
| shipping address     | string    | not null                      |
| created_at    | timestamp | default=current timestamp     |
| updated_at    | timestamp | default=current timestamp     |

**Relationships:**
- **Has many** `Pod`
- **Has many** `Contract`

---

### Contract

| Column                  | Type      | Details                        |
|-------------------------|-----------|--------------------------------|
| id                      | UUID      | primary key                    |
| physical_dc_id          | UUID      | foreign key, references `Physical DC(id)` |
| pod_id                  | UUID      | foreign key, references `Pod(id)`|
| max_racks               | integer   | not null                       |
| max_ru_per_rack         | integer   | not null                       |
| max_kw_per_rack         | decimal   | not null, precision=5, scale=2 |
| cost_per_kw             | decimal   | not null, precision=10, scale=2 |
| availability_start_date | date      | not null                       |
| created_at              | timestamp | default=current timestamp      |
| updated_at              | timestamp | default=current timestamp      |

**Relationships:**
- **Belongs to** `Physical DC`


---

### Pod

| Column     | Type      | Details                      |
|------------|-----------|------------------------------|
| id         | UUID      | primary key                   |
| physical_dc_id | UUID  | foreign key, references `Physical DC(id)` |
| created_at | timestamp | default=current timestamp     |
| updated_at | timestamp | default=current timestamp     |

**Relationships:**
- **Belongs to** `Physical DC`
- **Has many** `Spine`
- **Has many** `Rack`

---

### Spine

| Column      | Type      | Details                      |
|-------------|-----------|------------------------------|
| id          | UUID      | primary key                   |
| pod_id      | UUID      | foreign key, references `Pod(id)` |
| model_name  | string    | not null                      |
| created_at  | timestamp | default=current timestamp     |
| updated_at  | timestamp | default=current timestamp     |

**Relationships:**
- **Belongs to** `Pod`
- **Has many** `Rack`

---

### Rack

| Column    | Type      | Details                      |
|-----------|-----------|------------------------------|
| id        | UUID      | primary key                   |
| pod_id    | UUID      | foreign key, references `Pod(id)` |
| name      | string    | not null, unique              |
| max_ru    | integer   | not null                      |
| max_kw    | decimal   | not null, precision=5, scale=2 |
| created_at | timestamp | default=current timestamp     |
| updated_at | timestamp | default=current timestamp     |

**Relationships:**
- **Belongs to** `Spine`
- **Has many** `Rack Slot Tracking`

---

### Server

| Column      | Type      | Details                      |
|-------------|-----------|------------------------------|
| id          | UUID      | primary key                   |
| name        | string    | not null, unique, 100 characters |
| model_name  | string    | not null, 100 characters      |
| created_at  | timestamp | default=current timestamp     |
| updated_at  | timestamp | default=current timestamp     |

**Relationships:**
- **Has many** `Rack Slot Tracking`

---

### Rack_Slot

| Column      | Type      | Details                        |
|-------------|-----------|--------------------------------|
| id          | UUID      | primary key                    |
| rack_id     | UUID      | foreign key, references `Rack(id)` |
| server_id   | UUID      | foreign key, references `Device(id)` |
| ru_position | integer   | not null                       |
| role        | string    | not null                       |
 status       | string    | not null                       |
| created_at  | timestamp | default=current timestamp      |
| updated_at  | timestamp | default=current timestamp      |

**Relationships:**
- **Belongs to** `Rack`
- **Belongs to** `Server`
- **Belongs to** `NetHW`

---

---

### Device

| Column          | Type      | Details                        |
|-----------------|-----------|--------------------------------|
| id              | UUID      | primary key                    |
| generation_name | string    | not null, unique               |
| device_type     | string    | not null                       |
| rack_units      | integer   | not null                       |
| normalized_strength | decimal |                              |
| created_at      | timestamp | default=current timestamp      |
| updated_at      | timestamp | default=current timestamp      |

**Relationships:**
- **Has Many** `Rack_Slot`


---
