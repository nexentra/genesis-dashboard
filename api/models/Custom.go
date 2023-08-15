package models

import (
	"errors"
	"html"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgtype"
	"github.com/jinzhu/gorm"
	"github.com/lib/pq"
)

type CustomSchema struct {
	ID          uuid.UUID      `gorm:"primary_key; type:uuid;default:uuid_generate_v4()" json:"id"`
	Name        string         `gorm:"size:255;UNIQUE_INDEX:customSchemaindex;not null" json:"name"`
	Title       string         `gorm:"size:255;" json:"title"`
	Description string         `gorm:"size:255;" json:"description"`
	FieldNames  pq.StringArray `gorm:"type:text[];not null" json:"field_names"`
	Data        pgtype.JSONB   `gorm:"type:jsonb;default:'[]';not null" json:"data"`
	User        User           `json:"-"`
	UserID      uint32         `gorm:"UNIQUE_INDEX:customSchemaindex;not null" json:"user_id"`
	CreatedAt   time.Time      `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt   time.Time      `gorm:"default:CURRENT_TIMESTAMP" json:"updated_at"`
}

func (p *CustomSchema) Prepare() {
	p.ID = uuid.New()
	p.Name = html.EscapeString(strings.TrimSpace(p.Name))
	p.Title = html.EscapeString(strings.TrimSpace(p.Title))
	p.Description = html.EscapeString(strings.TrimSpace(p.Description))
	p.User = User{}
	p.CreatedAt = time.Now()
	p.UpdatedAt = time.Now()
}

func (p *CustomSchema) Validate() error {
	if p.UserID < 1 {
		return errors.New("Required User")
	}
	return nil
}

func (p *CustomSchema) SaveCustomSchema(db *gorm.DB) (*CustomSchema, error) {
	err := db.Debug().Model(&CustomSchema{}).Create(&p).Error
	if err != nil {
		return &CustomSchema{}, err
	}
	// if p.ID != 0 {
	// 	err = db.Debug().Model(&User{}).Where("id = ?", p.UserID).Take(&p.User).Error
	// 	if err != nil {
	// 		return &CustomSchema{}, err
	// 	}
	// }
	return p, nil
}

func (p *CustomSchema) FindAllCustomSchemas(db *gorm.DB) (*[]CustomSchema, error) {
	var err error
	customSchemas := []CustomSchema{}
	err = db.Debug().Model(&CustomSchema{}).Preload("custom_data").Find(&customSchemas).Error
	if err != nil {
		return &[]CustomSchema{}, err
	}
	// if len(customSchemas) > 0 {
	// 	for i, _ := range customSchemas {
	// 		log.Println(customSchemas[i].UserID)
	// 		err := db.Debug().Model(&User{}).Where("id = ?", customSchemas[i].UserID).Find(&customSchemas[i].User).Error
	// 		if err != nil {
	// 			return &[]CustomSchema{}, err
	// 		}
	// 	}
	// }
	return &customSchemas, nil
}

func (p *CustomSchema) GoFindAllMyCustomSchemas(db *gorm.DB, uid uint64) (*[]CustomSchema, error) {
	var err error
	customSchemas := []CustomSchema{}
	err = db.Debug().Model(&CustomSchema{}).Where("user_id = ?", uid).Limit(100).Find(&customSchemas).Error
	if err != nil {
		return &[]CustomSchema{}, err
	}
	// if len(customSchemas) > 0 {
	// 	for i, _ := range customSchemas {
	// 		log.Println(customSchemas[i].UserID)
	// 		err := db.Debug().Model(&User{}).Where("id = ?", customSchemas[i].UserID).Take(&customSchemas[i].User).Error
	// 		if err != nil {
	// 			return &[]CustomSchema{}, err
	// 		}
	// 	}
	// }
	return &customSchemas, nil
}

func (p *CustomSchema) GoFindCustomSchemaByID(db *gorm.DB, pid uint64, uid uint64) (*CustomSchema, error) {
	var err error
	err = db.Debug().Model(&CustomSchema{}).Where("id = ?", pid).Where("user_id = ?", uid).Take(&p).Error
	if err != nil {
		return &CustomSchema{}, err
	}
	// if p.ID != 0 {
	// 	err = db.Debug().Model(&User{}).Where("id = ?", p.UserID).Take(&p.User).Error
	// 	if err != nil {
	// 		return &CustomSchema{}, err
	// 	}
	// }
	return p, nil
}

func (p *CustomSchema) FindAllMyCustomSchemas(db *gorm.DB, uid uint32) (*[]CustomSchema, error) {
	var err error
	customSchemas := []CustomSchema{}
	err = db.Debug().Model(&CustomSchema{}).Where("user_id = ?", uid).Limit(100).Find(&customSchemas).Error
	if err != nil {
		return &[]CustomSchema{}, err
	}
	// if len(customSchemas) > 0 {
	// 	for i, _ := range customSchemas {
	// 		log.Println(customSchemas[i].UserID)
	// 		err := db.Debug().Model(&User{}).Where("id = ?", customSchemas[i].UserID).Take(&customSchemas[i].User).Error
	// 		if err != nil {
	// 			return &[]CustomSchema{}, err
	// 		}
	// 	}
	// }
	return &customSchemas, nil
}

func (p *CustomSchema) FindCustomSchemaByID(db *gorm.DB, pid string) (*CustomSchema, error) {
	var err error
	err = db.Debug().Model(&CustomSchema{}).Where("id = ?", pid).Take(&p).Error
	if err != nil {
		return &CustomSchema{}, err
	}
	// if p.ID != 0 {
	// 	err = db.Debug().Model(&User{}).Where("id = ?", p.UserID).Take(&p.User).Error
	// 	if err != nil {
	// 		return &CustomSchema{}, err
	// 	}
	// }
	return p, nil
}

func (p *CustomSchema) UpdateACustomSchema(db *gorm.DB) (*CustomSchema, error) {

	var err error

	err = db.Debug().Model(&CustomSchema{}).Where("id = ?", p.ID).Updates(CustomSchema{
		Name:        p.Name,
		Title:       p.Title,
		Description: p.Description,
		Data:        p.Data,
		FieldNames:  p.FieldNames,
		UpdatedAt:   time.Now()}).Error
	if err != nil {
		return &CustomSchema{}, err
	}
	return p, nil
}

func (p *CustomSchema) DeleteACustomSchema(db *gorm.DB, pid string, uid uint32) (int64, error) {

	db = db.Debug().Model(&CustomSchema{}).Where("id = ? and user_id = ?", pid, uid).Take(&CustomSchema{}).Delete(&CustomSchema{})

	if db.Error != nil {
		if gorm.IsRecordNotFoundError(db.Error) {
			return 0, errors.New("CustomSchema not found")
		}
		return 0, db.Error
	}
	return db.RowsAffected, nil
}
