<?php

    class CategoryclubController {

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
                    $this->getClubsByUser($id);
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
            $sql = "SELECT * FROM categoryclub";
            $stmt = $this->db->prepare($sql);
            $stmt->execute();
            $clubes = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($clubes);
        }

        // public function getClubsByUser(string $id) {
        //     $data = json_decode(file_get_contents('php://input'), true);
        //     $sql = "SELECT * FROM userclub WHERE id = :id";
        //     $stmt = $this->db->prepare($sql);
        //     $stmt->execute(
        //         [
        //             ':id' => $data['id']
        //         ]
        //     );
        //     $clubes = $stmt->fetch(PDO::FETCH_ASSOC);
        //     echo json_encode($clubes);
        // }

        public function create() {
            $data = json_decode(file_get_contents('php://input'), true);
            $sql = "INSERT INTO categoryclub (club_id, category_id) VALUES (:club_id, :category_id)";
            $stmt = $this->db->prepare($sql);
            $stmt->execute([
                ':club_id' => $data['club_id'],
                ':category_id' => $data['category_id']
            ]);

            $id = $this->db->lastInsertId();
            if ($id) {
                http_response_code(201);
                
            }
        }

        // public function create() {
        //     $data = json_decode(file_get_contents('php://input'), true);
        //     $sql = "INSERT INTO users (id, username, created_at, email) VALUES (:id, :username, :created_at, :email)";
        //     $stmt = $this->db->prepare($sql);
        //     $stmt->execute([
        //         ':id' => $data['id'],
        //         ':username' => $data['username'],
        //         ':created_at' => $data['created_at'],
        //         ':email' => $data['email']
        //     ]);
        //     $error = $stmt->errorInfo();
        //     if ($error[0] !== '00000') {
        //         echo json_encode($error);
        //     } else {
        //         http_response_code(201);
        //     }
        // }
    }



?>