<?php

    class ClubesController {

        private PDO $db;

        public function __construct(PDO $db) {
            $this->db = $db;
        }

        public function processRequest(string $method, ?string $id): void {
            if ($id) {
                $this->processResourceRequest($method, $id);
            } else {
                $this->processCollectionRequest($method);
            }
        }

        public function porcessResourceRequest(string $method, ?string $id): void
        {
            switch ($method) {
                case 'GET':
                    $this->getUserClub($id);
                    break;
            }
        }

        public function processCollectionRequest(string $method): void
        {
            switch ($method) {
                case 'GET':
                    $this->getAll();
                    break;
                case 'POST':
                    $this->create();
                    break;
            }
        }

        public function getAll() {
            $sql = "SELECT * FROM clubs";
            $stmt = $this->db->prepare($sql);
            $stmt->execute();
            $clubes = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($clubes);
        }

        public function get(string $id) {
            $sql = "SELECT * FROM clubs WHERE id = :id";
            $stmt = $this->db->prepare($sql);
            $stmt->execute([':id' => $id]);
            $clubes = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($clubes);
        }

        public function create() {
            $data = json_decode(file_get_contents('php://input'), true);
            $sql = "INSERT INTO clubs (name, description, meet, hours, discord, urlBanner, creator, created_at) VALUES (:name, :description, :meet, :hours, :discord, :urlBanner, :creator, :created_at)";
            $stmt = $this->db->prepare($sql);
            $stmt->execute([
                ':name' => $data['name'],
                ':description' => $data['description'],
                ':meet' => $data['meet'],
                ':hours' => $data['pais'],
                ':discord' => $data['discord'],
                ':urlBanner' => $data['urlBanner'],
                ':creator' => $data['creator'],
                ':created_at' => $data['created_at'],
            ]);
            $id = $this->db->lastInsertId();
            if ($id) {
                http_response_code(201);
                echo json_encode(['id' => $id]);
            }
        }

        public function getUserClub() {
            $data = json_decode(file_get_contents('php://input'), true);
            $parts = explode('/', $_SERVER['REQUEST_URI']);
            $id = $parts[2] ?? null;
            $sql = "SELECT * FROM userclub WHERE user_id = $id";
            $stmt = $this->db->prepare($sql);
            $stmt->execute();
            $clubes = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($clubes);
        }
    }



?>